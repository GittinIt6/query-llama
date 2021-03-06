const { AuthenticationError } = require('apollo-server-express');
const { User, Survey } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("surveys");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    surveys: async () => {
      return Survey.find();
    },
    survey: async (parent, { surveyId }) => {
      return Survey.findOne({ _id: surveyId });
    },
    publicSurveys: async () => {
      return Survey.find({isPublic: true})
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    addSurvey: async (parent, { question, isPublic, expireTime, surveyAuthor }) => {
      const survey = await Survey.create({
        question,
        isPublic,
        expireTime,
        surveyAuthor
      });
      return survey;
    },
    addAnswer: async (parent, { surveyId, answerText }) => {
      return Survey.findOneAndUpdate(
        { _id: surveyId },
        {
          $addToSet: { answers: { answerText } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    answerUp: async (parent, { surveyId, answerId }) => {
      return Survey.findOneAndUpdate(
        {
          _id: surveyId,
          'answers._id': answerId
        },
    { $inc: {'answers.$.voteCount': 1}},
    {
      new:true,
      runValidators: true
    }
      )
    },

    likeUp: async (parent, { surveyId }) => {
      return Survey.findOneAndUpdate(
        {_id: surveyId},
    { $inc: {upvotes: 1}},
    {
      new:true,
      runValidators: true
    }
      )
    },
    likeDown: async (parent, { surveyId }) => {
      return Survey.findOneAndUpdate(
        {_id: surveyId},
    { $inc: {upvotes: -1}},
    {
      new:true,
      runValidators: true
    }
      )
    },
    dislikeUp: async (parent, { surveyId, downvotes }) => {
      return Survey.findOneAndUpdate(
        {_id: surveyId},
    { $inc: {downvotes: 1}},
    {
      new:true,
      runValidators: true
    }
      )
    },
    dislikeDown: async (parent, { surveyId, downvotes }) => {
      return Survey.findOneAndUpdate(
        {_id: surveyId},
    { $inc: {downvotes: -1}},
    {
      new:true,
      runValidators: true
    }
      )
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;