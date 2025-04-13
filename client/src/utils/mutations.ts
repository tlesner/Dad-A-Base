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
	mutation Mutation($input: UserInput!) {
		addUser(input: $input) {
			user {
				username
				_id
			}
			token
		}
	}
`;

export const SAVE_VIDEO = gql`
	mutation saveVideo($userId: ID!, $videoURL: String!) {
		saveVideo(videoId: $videoId, videoURL: $videoURL) {
			_id
			username
			email
			password
			savedVideos {
				videoId
				creator
				title
        description
        image
        link
			}
      videoCount
		}
	}
`;

// export const ADD_THOUGHT = gql`
//   mutation AddThought($input: ThoughtInput!) {
//     addThought(input: $input) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//       }
//     }
//   }
// `;

// export const ADD_COMMENT = gql`
// 	mutation addComment($thoughtId: ID!, $commentText: String!) {
// 		addComment(thoughtId: $thoughtId, commentText: $commentText) {
// 			_id
// 			thoughtText
// 			thoughtAuthor
// 			createdAt
// 			comments {
// 				_id
// 				commentText
// 				createdAt
// 			}
// 		}
// 	}
// `;
