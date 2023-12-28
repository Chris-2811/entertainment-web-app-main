import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchContext from '../context/SearchContext';
import MediaCard from './MediaCard';

function SearchResults() {
  const {
    searchResults,
    movieSearchResults,
    showSearchResults,
    setSearchResults,
    searchData,
    setSearchData,
    searchAPIData,
  } = useContext(SearchContext);
  const location = useLocation();
  const [disabled, setDisabled] = useState({
    prev: false,
    next: false,
  });

  let length;

  if (location.pathname === '/home') {
    length = searchResults.length;
  } else if (location.pathname === '/movies') {
    length = movieSearchResults.length;
  } else {
    length = showSearchResults.length;
  }

  const query = JSON.parse(localStorage.getItem('query'));

  function handleBtnClick(e) {
    let newPage = searchData.page;

    if (e.target.id === 'next') {
      newPage =
        searchData.page < searchData.total_pages
          ? searchData.page + 1
          : searchData.total_pages;
    } else {
      newPage = searchData.page > 1 ? searchData.page - 1 : 1;
    }

    setSearchData({
      ...searchData,
      page: newPage,
    });

    console.log(newPage);

    if (newPage <= 1) {
      setDisabled({ prev: true, next: false });
    } else if (newPage < searchData.total_pages) {
      setDisabled({ prev: false, next: false });
    } else {
      setDisabled({ prev: false, next: true });
    }
  }

  useEffect(() => {
    setDisabled({ prev: true, next: false });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (location.pathname === '/movies') {
        await searchAPIData(query, 'movie', searchData.page);
      } else if (location.pathname === '/shows') {
        await searchAPIData(query, 'tv', searchData.page);
      } else if ((location.pathname = '/home')) {
        await searchAPIData(query, 'multi', searchData.page);
      }
    };

    fetchData();
  }, [searchData.page]);

  return (
    <div className="mycontainer mt-6 md:mt-10 pb-[3.5rem]">
      <h2 className="heading-lg mb-6">Found results for {query}</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-[1.875rem] md:gap-y-6 lg:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8">
        {location.pathname === '/home'
          ? searchResults.map((result) => (
              <MediaCard key={result.id} item={result} id={result.id} />
            ))
          : location.pathname === '/movies'
          ? movieSearchResults.map((result) => (
              <MediaCard key={result.id} item={result} id={result.id} />
            ))
          : showSearchResults.map((result) => (
              <MediaCard key={result.id} item={result} id={result.id} />
            ))}
      </div>
      <div className="mt-10">
        <button
          id="prev"
          onClick={handleBtnClick}
          className={'bg-sunset-orange px-7 py-2 mr-5 rounded-md text-white'}
          disabled={disabled.prev}
        >
          Prev
        </button>
        <button
          id="next"
          onClick={handleBtnClick}
          className="bg-sunset-orange px-7 py-2 rounded-md text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SearchResults;
