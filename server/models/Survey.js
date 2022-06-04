const { Schema, model } = require('mongoose');

const surveySchema = new Schema({
    question: {
        type: String,
        required: true,
        trim: true,
    },
    upvotes: {
        type: Number,
        required: true,
    },
    downvotes: {
        type: Number,
        required: true,
      },
    answerNum: {
        type: String,
    },
    isValid: {
        type: Boolean,
    },
    expireTime: {
        type: Date,
        required: false,
    },
  });

  const Survey = model('Survey', surveySchema);

module.exports = Survey;