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
			token
			user {
				_id
				username
			}
		}
	}
`;

// export const SAVE_VIDEO = gql`
// 	mutation saveVideo($userId: ID!, $videoURL: String!) {
// 		saveVideo(videoId: $videoId, videoURL: $videoURL) {
// 			_id
// 			username
// 			email
// 			password
// 			savedVideos {
// 				videoId
// 				creator
// 				title
// 				description
// 				image
// 				link
// 			}
// 			videoCount
// 		}
// 	}
// `;

export const SAVE_VIDEO = gql`
	mutation saveVideo($video: VideoInput!) {
		saveVideo(video: $video) {
			_id
			username
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
