import React from 'react';
import MediaCard from './MediaCard';

function BookmarkedShows({ shows }) {
  return (
    <div className="mycontainer">
      <h1 className="heading-lg mb-4 mt-6 md:mt-8 lg:mt-[2.125rem] xl:mb-6 ">
        Bookmarked TV series
      </h1>
      <div className="grid xs:grid-cols-2 gap-4  md:grid-cols-3 md:gap-x-[1.875rem] md:gap-y-6 lgx:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8">
        {shows.map((show) => {
          return <MediaCard item={show} key={show.id} />;
        })}
      </div>
    </div>
  );
}

export default BookmarkedShows;
