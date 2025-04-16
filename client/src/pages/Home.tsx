import { useQuery } from '@apollo/client';
import { useState } from 'react';
// import VideoList from '../components/VideoList/index.tsx';
import { QUERY_VIDEOS } from '../utils/queries.ts';
// import { useNavigate } from 'react-router-dom';
import VideoModal from '../components/VideoModal/index.tsx';
import Auth from '../utils/auth.ts';

const Home = () => {
	const { loading, data, error } = useQuery(QUERY_VIDEOS);

	const isLoggedIn = Auth.loggedIn();
	console.log(' Home ~ isLoggedIn:', isLoggedIn);

	const [searchTerm, setSearchTerm] = useState('');
	const [selectedVideo, setSelectedVideo] = useState(null);
	// const [showModal, setShowModal] = useState(false);

	const handleOpenModal = (video: any) => {
		console.log('opening modal for: ', video);
		setSelectedVideo(video);
		// setShowModal(true);
	};

	const handleCloseModal = () => {
		setSelectedVideo(null);
		// setShowModal(false);
	};

	const filteredVideos = data?.videos?.filter((video: any) =>
		`${video.title ?? ''} ${video.creator ?? ''}`
			.toLowerCase()
			.includes(searchTerm.toLowerCase())
	);

	if (loading) return <p> Loading...</p>;

	if (error) return <p>Error loading your videos :/ </p>;

	return (
		<main style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
			{/* Search */}
			<div
				style={{
					fontFamily: 'sans-serif',
					textAlign: 'center',
					marginTop: '2rem',
				}}>
				{/* Search Section */}
				<div style={{ marginBottom: '2rem' }}>
					<label htmlFor="search" style={{ marginRight: '0.5rem' }}>
						Search:
					</label>
					<input
						id="search"
						type="text"
						placeholder="Type in the type of video you are looking for"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						style={{
							padding: '0.5rem',
							width: '300px',
							border: '1px solid #ccc',
							borderRadius: '5px',
						}}
					/>
					<div style={{ marginTop: '1rem' }}>
						<button
							style={{
								padding: '0.4rem 1rem',
								border: '1px solid #ccc',
								borderRadius: '5px',
								backgroundColor: 'white',
								cursor: 'pointer',
							}}>
							Popular Videos 🔥
						</button>
					</div>
				</div>

				{/* Video List */}
				<h2 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
					Popular Videos
				</h2>

				<div style={{ maxWidth: '800px', margin: '0 auto' }}>
					{filteredVideos.length > 0 ? (
						filteredVideos.map((video: any) => (
							<div
								key={video.videoId}
								style={{
									marginBottom: '1.5rem',
									borderRadius: '4px',
									overflow: 'hidden',
								}}
								// onClick={() => handleOpenModal(video)}
							>
								<div
									style={{
										backgroundColor: '#2c3e50',
										color: 'white',
										padding: '0.75rem',
										fontWeight: 'bold',
									}}>
									{video.creator}
								</div>
								<div
									style={{
										backgroundColor: '#dceeea',
										padding: '1rem',
										fontSize: '1.1rem',
									}}>
									{video.title}
								</div>
								<div
									style={{
										backgroundColor: '#2c3e50',
										color: 'white',
										padding: '0.5rem',
									}}>
									{video.link ? (
										// <a
										// 	href={video.link}
										// 	target="_blank"
										// 	rel="noopener noreferrer"
										// 	style={{
										// 		color: 'white',
										// 		textDecoration: 'underline',
										// 	}}>
										// 	Watch Video
										// </a>
										<button
											onClick={() =>
												handleOpenModal(video)
											}>
											Watch Video
										</button>
									) : (
										<span>No link available</span>
									)}
								</div>
							</div>
						))
					) : (
						<p>No videos found.</p>
					)}
				</div>
			</div>
			{selectedVideo && (
				<VideoModal
					video={selectedVideo}
					onClose={handleCloseModal}
					isLoggedIn={isLoggedIn}
				/>
			)}
		</main>
	);
};

export default Home;
