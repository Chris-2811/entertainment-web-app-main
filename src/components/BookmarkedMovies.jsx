import React from 'react';
import MediaCard from './MediaCard';

function BookmarkedMovies({ movies }) {
  console.log(movies);

  return (
    <div className="mycontainer">
      <h1 className="heading-lg my-6 md:mt-8 lg:mt-[2.125rem] lg:mb-[2.375rem]">
        Bookmarked Movies
      </h1>
      <div className="grid grid-cols-2 gap-4  md:grid-cols-3 md:gap-x-[1.875rem] md:gap-y-6 lg:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8">
        {movies.map((movie) => {
          return <MediaCard item={movie} key={movie.id} />;
        })}
      </div>
    </div>
  );
}

export default BookmarkedMovies;
