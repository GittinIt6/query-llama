import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_SURVEY = gql`
  mutation addSurvey($question: String!, $isPublic: Boolean!, $surveyAuthor: String!) {
  addSurvey(question: $question, isPublic: $isPublic, surveyAuthor: $surveyAuthor) {
    _id
    question
    surveyAuthor
    expireTime
    answers {
      _id
      answerText
    }
  }
}
`;

export const ADD_ANSWER = gql`
  mutation addAnswer($surveyId: ID!, $answerText: String!) {
  addAnswer(surveyId: $surveyId, answerText: $answerText) {
    _id
    question
    surveyAuthor
    answers {
      _id
      answerText
    }
  }
}
`;