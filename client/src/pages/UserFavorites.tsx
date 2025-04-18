import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
// import VideoList from '../components/VideoList';
import VideoModal from '../components/VideoModal';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const UserFavorites = () => {
	const { username: userParam } = useParams();

	console.log('userParam:', userParam);

	const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
		variables: { username: userParam },
	});

	console.log('data: ', data);
	const [selectedVideo, setSelectedVideo] = useState(null);
	const [selectedTag, setSelectedTag] = useState<string | null>(null);
	const user = data?.me || data?.user || {};

	if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
		// If the condition is true, it navigates to the "/me" route, which is likely the user's profile page.
		return <Navigate to="/me" />;
	}
	console.log('Auth.getProfile():', Auth.getProfile());

	if (loading) {
		return <div>Loading...</div>;
	}

	// This if condition checks if the user is logged in and if the logged-in user's username matches the userParam.
	if (!user?.username) {
		return (
			<h4>
				You need to be logged in to see this. Use the navigation links
				above to sign up or log in!
			</h4>
		);
	}
	console.log('user: ', user);

	const handleOpenModal = (video: any) => {
		console.log('opening modal for: ', video);
		setSelectedVideo(video);
		// setShowModal(true);
	};

	const handleCloseModal = () => {
		setSelectedVideo(null);
		// setShowModal(false);
	};

	const tags = ['DIY', 'Auto', 'Cooking', 'Finance'];
	const filteredVideos = selectedTag
		? user.savedVideos.filter((video: any) =>
				video.tags?.includes(selectedTag)
		  )
		: user.savedVideos;

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '2rem',
				padding: '2rem',
			}}>
			<h2 style={{ textAlign: 'center' }}>
				Viewing {userParam ? `${user.username}'s` : 'your'} favorite
				videos
			</h2>

			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					gap: '2rem',
					flexWrap: 'wrap',
				}}>
				{/* Left column: Favorite Videos */}
				<div
					style={{
						flex: '1 1 200px',
						backgroundColor: '#f3f3f3',
						padding: '1rem',
						minWidth: '200px',
					}}>
					<h3>Favorite Videos</h3>
					<ul>
						{filteredVideos.map((video: any) => (
							<li
								key={video.videoId}
								style={{ cursor: 'pointer' }}
								onClick={() => handleOpenModal(video)}>
								{video.title}
							</li>
						))}
					</ul>
				</div>

				{/* Right column: Tags */}
				<div style={{ flex: '2 1 300px', minWidth: '300px' }}>
					<div
						style={{
							backgroundColor: '#f3f3f3',
							padding: '1rem',
							marginBottom: '1rem',
							textAlign: 'center',
						}}>
						<strong>Tag Zone</strong>
					</div>
					<div
						style={{
							backgroundColor: '#f3f3f3',
							padding: '1rem',
							textAlign: 'center',
						}}>
						<p>Tags you can filter by:</p>
						<div
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								justifyContent: 'center',
								gap: '0.5rem',
							}}>
							{tags.map((tag) => (
								<button
									key={tag}
									onClick={() => setSelectedTag(tag)}
									style={{
										padding: '0.5rem 1rem',
										border:
											selectedTag === tag
												? '2px solid #000'
												: '1px solid #ccc',
										backgroundColor:
											selectedTag === tag
												? '#ddd'
												: '#fff',
										borderRadius: '4px',
										cursor: 'pointer',
									}}>
									{tag}
								</button>
							))}
							{selectedTag && (
								<button
									onClick={() => setSelectedTag(null)}
									style={{
										padding: '0.5rem 1rem',
										backgroundColor: '#eee',
										border: '1px solid #999',
										cursor: 'pointer',
									}}>
									Clear
								</button>
							)}
						</div>
					</div>
				</div>
			</div>

			{selectedVideo && (
				<VideoModal
					video={selectedVideo}
					onClose={handleCloseModal}
					isLoggedIn={Auth.loggedIn()}
					savedVideos={user.savedVideo}
				/>
			)}
		</div>
	);
};

export default UserFavorites;
