//TODO: User Favorite Videos - have list of videos + tags to filter by
//TODO: Use video modal popup when clicking on a video from the list

import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import VideoList from '../components/VideoList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const UserFavorites = () => {
	const { username: userParam } = useParams();

	console.log('userParam:', userParam);

	const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
		variables: { username: userParam },
	});

	console.log('data: ', data);

	// let user = {};
	// if (userParam) {
	// 	user = data?.user;
	// 	console.log('user with userParam:', user);
	// } else {
	// 	user = data?.me;
	// 	console.log('user without userParam:', user);
	// }
	const user = data?.me || data?.user || {};

	// This if condition checks if the user is logged in and if the logged-in user's username matches the userParam.

	console.log('Auth.getProfile():', Auth.getProfile());

	if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
		// If the condition is true, it navigates to the "/me" route, which is likely the user's profile page.
		return <Navigate to="/me" />;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	console.log('user: ', user);
	if (!user?.username) {
		return (
			<h4>
				You need to be logged in to see this. Use the navigation links
				above to sign up or log in!
			</h4>
		);
	}

	return (
		<div>
			<div className="flex-row justify-center mb-3">
				<h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
					Viewing {userParam ? `${user.username}'s` : 'your'} profile.
				</h2>

				<div className="col-12 col-md-10 mb-5">
					<VideoList
						videos={user.savedVideos}
						title={`${user.username}'s videos...`}
					/>
				</div>
				{/* {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <ThoughtForm />
          </div>
        )} */}
			</div>
		</div>
	);
};

export default UserFavorites;
