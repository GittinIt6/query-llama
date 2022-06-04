const { Schema, model } = require('mongoose');

const surveySchema = new Schema({
    question: {
        type: String,
        required: true,

    },
    upvotes: {
        type: Number,
        required: true,
        default: 0
    },
    downvotes: {
        type: Number,
        required: true,
        default: 0
      },
    answerNum: {
        type: String,
    },
    isValid: {
        type: Boolean,
    },
    isPublic: {
        type: Boolean,
        default: true,
    },
    expireTime: {
        type: Date,
        required: false,
    },
    surveyAuthor: {
        type: String,
        required: false,
        default: "temp-default"
    },
    answers: [
        {
          answerText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 32,
            trim: true,
          },
          voteCount: {
              type: Number,
              default: 0,
              minlength: 0,   
          }
        },
    ],
  });

  const Survey = model('Survey', surveySchema);

module.exports = Survey;