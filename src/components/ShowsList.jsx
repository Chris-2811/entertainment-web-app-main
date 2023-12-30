import React, { useEffect, useState } from 'react';
import requests from '../Requests';
import MediaCard from './MediaCard';

function ShowsList() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(requests.requestPopularShows);
      const data = await response.json();
      const shows = data.results.map((show) => ({
        ...show,
        type: 'TV',
      }));

      setShows(shows);
    };
    fetchData();
  }, []);

  return (
    <div className="mycontainer mt-6 md:mt-10 pb-[3.5rem]">
      <h2 className="heading-lg mb-6">TV Series</h2>
      <div className="grid xs:grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-[1.875rem] md:gap-y-6 lg:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8">
        {shows.map((item) => {
          return <MediaCard key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}

export default ShowsList;
