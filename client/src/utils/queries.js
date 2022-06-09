import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      surveys {
        _id
        question
      }
    }
  }
`;


export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      surveys {
        _id
        question
        surveyAuthor
      }
    }
  }
`;

export const QUERY_SURVEYS = gql`
  query Surveys {
  surveys {
    _id
    question
    downvotes
    upvotes
    answerNum
    isValid
    isPublic
    expireTime
    surveyAuthor
    answers {
      _id
      answerText
      voteCount
    }
  }
}
`;

export const QUERY_SINGLE_SURVEY = gql`
query getSingleSurvey($surveyId: ID!) {
  survey(surveyId: $surveyId) {
    _id
    question
    upvotes
    downvotes
    answerNum
    isValid
    isPublic
    expireTime
    surveyAuthor
    answers {
      _id
      answerText
      voteCount
    }
  }
}
`;



