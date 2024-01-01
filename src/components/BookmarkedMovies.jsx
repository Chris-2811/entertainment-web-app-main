import React from 'react';
import MediaCard from './MediaCard';

function BookmarkedMovies({ movies }) {
  console.log(movies);

  return (
    <div className="mycontainer mt-6 md:mt-7 xl:mt-10">
      <h1 className="heading-lg mb-4 xl:mb-6">Bookmarked Movies</h1>
      <div className="grid xs:grid-cols-2 gap-4  md:grid-cols-3 md:gap-x-[1.875rem] md:gap-y-6 lgx:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8">
        {movies.map((movie) => {
          return <MediaCard item={movie} key={movie.id} />;
        })}
      </div>
    </div>
  );
}

export default BookmarkedMovies;
