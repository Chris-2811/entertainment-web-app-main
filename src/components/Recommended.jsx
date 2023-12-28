import React, { useEffect, useState } from 'react';
import requests from '../Requests';
import MediaCard from './MediaCard';

function Recommended() {
  const [recommended, setRecommended] = useState([]);
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async (request, type, setter) => {
      const response = await fetch(request);
      const data = await response.json();
      const results = data.results.map((result) => ({
        ...result,
        type,
      }));
      setter(results);
    };

    fetchData(requests.requestPopularMovies, 'Movie', setMovies);
    fetchData(requests.requestPopularShows, 'TV', setShows);
  }, []);

  useEffect(() => {
    if (movies.length > 0 && shows.length > 0) {
      let mergedArray = movies.concat(shows);
      mergedArray = mergedArray.slice(0, 26);
      mergedArray = mergedArray.sort(() => Math.random() - 0.5);
      setRecommended(mergedArray);
    }
  }, [movies, shows]);

  return (
    <div className="mycontainer mt-6 md:mt-10 pb-[3.5rem]">
      <h2 className="heading-lg mb-6">Recommended for you</h2>
      <div className="grid  xs:grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-[1.875rem] md:gap-y-6 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8">
        {recommended.map((item) => {
          return <MediaCard key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}

export default Recommended;
