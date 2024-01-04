import React, { useState, useEffect } from 'react';
import requests from '../Requests';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import MediaCard from './MediaCard';

function Trending() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(requests.requestTrending);
        const data = await response.json();
        const results = data.results;
        setTrending(results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  function slideLeft() {
    let slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  }

  function slideRight() {
    let slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  return (
    <div className="mt-6  xl:mt-10">
      <div className="grid-container-trending">
        <h1 className="heading-lg mb-4 xl:mb-6 ">Trending</h1>
        <div className="relative group">
          <MdChevronLeft
            onClick={() => slideLeft()}
            size={40}
            className="absolute left-0 top-[50%] -translate-y-[50%] cursor-pointer rounded-full bg-white opacity-50 z-10 hidden group-hover:block"
          />
          <div
            id="slider"
            className="flex items-center gap-4 overflow-x-scroll scroll-smooth scrollbar-hide whitespace-nowrap"
          >
            {trending.map((item) => {
              return <MediaCard key={item.id} item={item} trending={true} />;
            })}
          </div>
          <MdChevronRight
            onClick={() => slideRight()}
            size={40}
            className="absolute right-0 top-[50%] -translate-y-[50%] cursor-pointer bg-white opacity-50 rounded-full z-10 hidden group-hover:block  "
          />
        </div>
      </div>
    </div>
  );
}

export default Trending;
