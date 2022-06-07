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
  # create a GraphQL query to be executed by Apollo Client
  query surveys {
    surveys {
      _id
      question
      upvotes
      downvotes
      answerNum
      isValid
      isPublic
      expireTime
      surveyAuthor
    }
  }
`;
