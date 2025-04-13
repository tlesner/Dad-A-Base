const typeDefs = `
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
    
    type Query {
    me: User
    }

    type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveVideo(videoData: VideoSave!): User
    removeVideo(videoId: ID!): User
    }
`;

export default typeDefs;
