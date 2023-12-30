import React, { useEffect, useState } from 'react';
import requests from '../Requests';
import MediaCard from './MediaCard';
import MediaCardSkeleton from './MediaCardSkeleton';

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(requests.requestPopularMovies);
      const data = await response.json();
      const movies = data.results.map((movie) => ({
        ...movie,
        type: 'Movie',
      }));

      setMovies(movies);
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="mycontainer mt-6 md:mt-10 pb-[3.5rem]">
      <h2 className="heading-lg mb-6">Movies</h2>
      <div className="grid xs:grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-[1.875rem] md:gap-y-6 lg:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8">
        {loading
          ? Array(4)
              .fill()
              .map((_, i) => (
                <MediaCardSkeleton
                  key={i}
                  animation={`animate-colorChange-${i + 1}`}
                />
              ))
          : movies.map((item) => <MediaCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}

export default MoviesList;
