import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      savedVideos {
        videoId
        creator
        title
        description
        image
        link
      }
    }
  }
`;

export const QUERY_VIDEOS = gql`
  query getVideos {
    video {
      videoId
      creator
      description
      title
      image
      link
    }
  }
`;

export const QUERY_SINGLE_VIDEO = gql`
  query getSingleVideo($videoId: ID!) {
    video(videoId: $videoId) {
      videoId
      creator
      title
      description
      image
      link
    }
  }
`;

// export const QUERY_THOUGHTS = gql`
//   query getThoughts {
//     thoughts {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//     }
//   }
// `;

// export const QUERY_SINGLE_THOUGHT = gql`
//   query getSingleThought($thoughtId: ID!) {
//     thought(thoughtId: $thoughtId) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//         commentAuthor
//         createdAt
//       }
//     }
//   }
// `;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedVideos {
        videoId
        creator
        title
        description
        image
        link
      }
    }
  }
`;
