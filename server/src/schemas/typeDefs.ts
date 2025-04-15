import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    videoCount: Int
    savedVideos: [Video]
  }

  type Video {
    videoId: String!
    creator: String!
    description: String!
    title: String!
    image: String
    link: String
  }

  input VideoSave {
    videoId: String!
    creator: String!
    description: String!
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input VideoSave {
    creator: String!
    description: String!
    title: String!
    videoId: String!
    image: String
    link: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Query {
    me: User
    videos: [Video]!
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(input: UserInput!): Auth
    saveVideo(videoData: VideoSave!): User
    removeVideo(videoId: ID!): User
  }
`;

export default typeDefs;
