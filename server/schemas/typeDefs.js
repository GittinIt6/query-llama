const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Survey {
    _id: ID
    question: String
    upvotes: Int
    downvotes: Int
    answerNum: String
    isValid: Boolean
    expireTime: String
    answers: [Answer]!
  }

  type Answer {
    _id: ID
    answerText: String
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
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
