const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    surveys: [Survey]
  }

  type Survey {
    _id: ID
    question: String
    upvotes: Int
    downvotes: Int
    answerNum: String
    isValid: Boolean
    isPublic: Boolean
    expireTime: String
    surveyAuthor: String
    answers: [Answer]
  }

  type Answer {
    _id: ID
    answerText: String
    voteCount: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    surveys: [Survey]
    survey(surveyId: ID!): Survey
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSurvey(question: String!, isPublic: Boolean, expireTime: String, surveyAuthor: String!): Survey
    addAnswer(surveyId: ID!, answerText: String!): Survey
    likeUp(surveyId: String!): Survey
    likeDown(surveyId: String!): Survey
    dislikeUp(surveyId: String!): Survey
    dislikeDown(surveyId: String!): Survey
  }
`;

module.exports = typeDefs;

