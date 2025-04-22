import React, { useState, useEffect } from 'react';

import { UPDATE_VIDEO, REMOVE_VIDEO } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import { useMutation } from '@apollo/client';
import { Video } from '../../interfaces/VideoData';

import './VideoModal.css';

interface VideoModalProps {
	video: Video;
	onClose: () => void;
	isLoggedIn: boolean;
	savedVideos?: Video[];
}

const VideoModal: React.FC<VideoModalProps> = ({
	video,
	onClose,
	isLoggedIn,
	savedVideos,
}) => {
	console.log('Video modal: ', video);
	if (!savedVideos) {
		savedVideos = [];
	}

	console.log('Saved Vidoes: ', savedVideos);

	const [isVideoSaved, setIsVideoSaved] = useState(false);
	console.log('isVideoSaved: ', isVideoSaved);

	const [savedVideoIds, setSavedVideoIds] = useState<string[]>([]);

	const [saveVideo] = useMutation(UPDATE_VIDEO, {
		refetchQueries: [QUERY_ME, 'me'],
	});

	const [removeVideo] = useMutation(REMOVE_VIDEO, {
		refetchQueries: [QUERY_ME, 'me'],
	});

	//Update the videoIds that are saved to the User
	useEffect(() => {
		const ids = savedVideos.map((video) => video.videoId);
		setSavedVideoIds(ids);
		console.log('Updated savedVideoIds: ', ids);
	}, [savedVideos]);

	//Check if the current video is already saved or not
	useEffect(() => {
		const saved = savedVideoIds.includes(video.videoId);
		setIsVideoSaved(saved);
		console.log('Updated isVideoSaved: ', saved);
	}, [savedVideoIds, video.videoId]);

	// When you click 'Save Video button'
	const handleSave = async () => {
		try {
			await saveVideo({
				variables: {
					videoData: {
						videoId: video.videoId,
						creator: video.creator,
						title: video.title,
						description: video.description,
						image: video?.image || '',
						link: video?.link || '',
					},
				},
			});
			setSavedVideoIds((prev) => [...prev, video.videoId]);
		} catch (err) {
			console.error('Save video failed: ', err);
			alert('Failed to save video.');
		}
	};

	// When you click 'Unsave Video button'
	const handleRemoveSave = async () => {
		try {
			await removeVideo({
				variables: {
					videoId: video.videoId,
				},
			});
			setSavedVideoIds((prev) =>
				prev.filter((id) => id !== video.videoId)
			);
		} catch (err) {
			console.error('Remove video failed: ', err);
			alert('Failed to remove video.');
		}
	};

	return (
		<div className="modalOverlay" onClick={onClose}>
			<div className="modalContent" onClick={(e) => e.stopPropagation()}>
				<h2>{video.title}</h2>
				<p>
					<strong>Creator:</strong> {video.creator}
				</p>
				<p>{video.description}</p>
				{video.link && (
					<iframe
						width="100%"
						height="315"
						src={video.link.replace('watch?v=', 'embed/')}
						title="YouTube video"
						style={{ margin: '20px 0' }}></iframe>
				)}

				{isLoggedIn && (
					<button
						onClick={isVideoSaved ? handleRemoveSave : handleSave}>
						{isVideoSaved ? 'Unsave Video' : 'Save Video'}
					</button>
				)}
				<button onClick={onClose}>Close</button>
			</div>
		</div>
	);
};

export default VideoModal;
