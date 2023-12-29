import React, { useContext, useState, useEffect } from 'react';
import search from '../assets/icon-search.svg';
import { useLocation } from 'react-router-dom';
import SearchContext from '../context/SearchContext';

function SearchBar({ setSearch }) {
  const [text, setText] = useState('');
  const location = useLocation();
  const { searchResults, searchAPIData } = useContext(SearchContext);

  async function handleSubmit(e) {
    e.preventDefault();

    if (location.pathname === '/home' && text !== '') {
      await searchAPIData(text, 'multi');
    } else if (location.pathname === '/movies' && text !== '') {
      await searchAPIData(text, 'movie');
    } else if (location.pathname === '/shows' && text !== '') {
      await searchAPIData(text, 'tv');
    }
  }

  function handleChange(e) {
    setText(e.target.value);
    if (location.pathname === '/bookmarked') setSearch(e.target.value);
  }

  return (
    <div className="mycontainer mt-6 md:mt-8 lg:mt-16">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 md:gap-4">
          <img src={search} alt="search-icon" className="w-6 lg:w-8" />
          <input
            type="text"
            placeholder={
              location.pathname === '/home'
                ? 'Search for movies or TV series'
                : location.pathname === '/movies'
                ? 'Search for movies'
                : location.pathname === '/shows'
                ? 'Search for TV-series'
                : 'Search bookmarked Movies and TV series'
            }
            className=" bg-transparent w-full fs-700 placeholder:text-white/50 text-white outline-none"
            value={text}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
