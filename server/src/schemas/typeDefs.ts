import { gql } from 'apollo-server-express';

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

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    videos: [Video]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveVideo(videoData: VideoSave!): User
    removeVideo(videoId: String!): User
  }
`;

export default typeDefs;
