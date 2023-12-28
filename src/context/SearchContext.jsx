import { createContext, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState(null);
  const [searchData, setSearchData] = useState({ page: 1 });
  const [movieSearchResults, setMovieSearchResults] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(null);
  const [query, setQuery] = useState([]);

  const key = '05e1c39526cfcad16d30aae45602a17f';
  const location = useLocation();

  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem('searchResults'));
    setSearchResults(savedResults);
    const savedResults2 = JSON.parse(
      localStorage.getItem('movieSearchResults')
    );
    setMovieSearchResults(savedResults2);
    const savedResults3 = JSON.parse(localStorage.getItem('showSearchResults'));
    setShowSearchResults(savedResults3);

    const searchData = JSON.parse(localStorage.getItem('searchData'));
    setSearchData(searchData);
  }, []);

  const [prevLocation, setPrevLocation] = useState();

  useEffect(() => {
    if (prevLocation && location.pathname !== prevLocation) {
      localStorage.clear();
      setSearchResults(null);
      setMovieSearchResults(null);
      setShowSearchResults(null);
    }
    setPrevLocation(location.pathname);
  }, [location]);

  // Search API Data
  async function searchAPIData(item, endpoint, page = 1) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/${endpoint}?api_key=${key}&query=${item}&page=${page}`
    );
    const data = await response.json();
    const results = data.results;

    if (endpoint === 'multi') {
      setSearchResults(results);
      setSearchData(data);
      localStorage.setItem('searchResults', JSON.stringify(results));
      localStorage.setItem('searchData', JSON.stringify(data));

      localStorage.setItem('query', JSON.stringify(item));
    } else if (endpoint === 'movie') {
      const movieResults = results.map((result) => {
        return {
          ...result,
          type: 'Movie',
        };
      });
      localStorage.setItem('movieSearchResults', JSON.stringify(results));
      localStorage.setItem('query', JSON.stringify(item));
      localStorage.setItem('searchData', JSON.stringify(data));

      setMovieSearchResults(movieResults);
      setSearchData(data);
    } else if (endpoint === 'tv') {
      setShowSearchResults(results);
      localStorage.setItem('showSearchResults', JSON.stringify(results));
      localStorage.setItem('query', JSON.stringify(item));
      setSearchData(data);
      localStorage.setItem('searchData', JSON.stringify(data));
    }
    setQuery(item);
  }

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        setSearchResults,
        movieSearchResults,
        setMovieSearchResults,
        showSearchResults,
        setShowSearchResults,
        searchAPIData,
        query,
        searchData,
        setSearchData,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
