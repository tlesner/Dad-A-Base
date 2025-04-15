// Import `<Link>` component from React Router for internal hyperlinks
import { Link } from 'react-router-dom';
import { Video } from '../../interfaces/VideoData';


interface VideoListProps {
  videos: Video[];
  title: string;
}

const VideoList: React.FC<VideoListProps> = ({ videos, title }) => {
  if (!videos.length) {
    return <h3>No Videos Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {videos &&
        videos.map((video) => (
          <div key={video.videoId} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {video.creator} <br />
              {/* <span style={{ fontSize: '1rem' }}>
                had this thought on {new Date(Number(video.createdAt)).toLocaleString()}
              </span> */}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{video.title}</p>
            </div>
            {/* Create a link to this thought's page to view its comments using `<Link>` component */}
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/videos/${video.videoId}`}
            >
              blah blah
            </Link>
          </div>
        ))}
    </div>
  );
};

export default VideoList;
