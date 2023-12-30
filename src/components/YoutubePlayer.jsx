import React, { useEffect, useRef, useState } from 'react';

import YouTube from 'react-youtube';

function YoutubePlayer({ link, setShowPlayer, showPlayer }) {
  const videoId = link.split('=')[1]; // Extract video ID from link
  const playerRef = useRef(null);
  const [playSize, setPlayerSize] = useState({
    width: '100%',
    height:
      window.innerWidth > 1020
        ? '600'
        : window.innerWidth <= 1020 && window.innerWidth >= 450
        ? '550'
        : '525',
  });

  const opts = {
    height: playSize.height.toString(),
    width: playSize.width.toString(),
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  useEffect(() => {
    const handleResize = () => {
      setPlayerSize({
        width: '100%',
        height:
          window.innerWidth > 1020
            ? '600'
            : window.innerWidth <= 1020 && window.innerWidth >= 450
            ? '550'
            : '525',
      });
    };

    window.addEventListener('resize', handleResize);

    function handleClickOutside(event) {
      if (playerRef.current && !playerRef.current.contains(event.target)) {
        setShowPlayer(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowPlayer]);

  return (
    showPlayer && (
      <div
        className="w-full absolute top-0 left-0   md:left-0  md:top-0 md:absolute  max-w-[100%]"
        ref={playerRef}
      >
        <YouTube
          className="player rounded-lg overflow-hidden"
          videoId={videoId}
          opts={opts}
        />
      </div>
    )
  );
}

export default YoutubePlayer;
