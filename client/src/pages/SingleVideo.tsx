//TODO: Instead of a page, create a modal and have a button to favorite/unfavorte the video!

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import CommentList from '../components/old/CommentList/index.tsx';
// import CommentForm from '../components/old/CommentForm/index.tsx';

import { QUERY_SINGLE_VIDEO } from '../utils/queries.ts';

const SingleVideo = () => {
  const { videoId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_VIDEO, {
    variables: { videoId: videoId },
  });

  const video = data?.video || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {video.creator} <br />
        {/* <span style={{ fontSize: '1rem' }}>
          had this thought on {new Date(Number(video.createdAt)).toLocaleString()}
        </span> */}
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {video.title}
        </blockquote>
      </div>

      {/* <div className="my-5">
        <CommentList comments={thought.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm thoughtId={thought._id} />
      </div> */}
    </div>
  );
};

export default SingleVideo;
