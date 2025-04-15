import { useQuery } from '@apollo/client';
// import React, { useState } from 'react';
import VideoList from '../components/VideoList/index.tsx';
// import ThoughtForm from '../components/old/ThoughtForm/index.tsx';

import { QUERY_VIDEOS } from '../utils/queries.ts';

const Home = () => {
  const { loading, data } = useQuery(QUERY_VIDEOS);
  console.log(data)
  
  const videos = data?.videos || [];
  console.log(videos)

  // const [searchTerm, setSearchTerm] = useState('');

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(e.target.value);
  // };

  // const filteredVideos = videos.filter((video: any) =>
  // video.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  
  return (
    <main>
      <div className="flex-row justify-center">
        {/* <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
           <ThoughtForm />
        </div> */}
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <VideoList
              videos={videos}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
