import React from 'react';

import { SAVE_VIDEO } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { Video } from '../../interfaces/VideoData';

import './VideoModal.css';

interface VideoModalProps {
	video: Video;
	onClose: () => void;
	isLoggedIn: boolean;
}

const VideoModal: React.FC<VideoModalProps> = ({
	video,
	onClose,
	isLoggedIn,
}) => {
	const [saveVideo] = useMutation(SAVE_VIDEO);

	const handleSave = async () => {
		try {
			await saveVideo({
				variables: {
					video: {
						videoId: video.videoId,
						creator: video.creator,
						title: video.title,
						description: video.description,
						image: video?.image || '',
						link: video?.link || '',
					},
				},
			});
			alert('Video saved!');
		} catch (err) {
			console.error('Save video failed: ', err);
			alert('Failed to save video.');
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

				{isLoggedIn && <button onClick={handleSave}>Save Video</button>}
				<button onClick={onClose}>Close</button>
			</div>
		</div>
	);
};

export default VideoModal;
