import React, { useContext } from 'react';
import MoviesList from '../components/MoviesList';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import SearchContext from '../context/SearchContext';

function Movies() {
  const { movieSearchResults } = useContext(SearchContext);
  return (
    <>
      <SearchBar />
      {movieSearchResults ? <SearchResults /> : <MoviesList />}
    </>
  );
}

export default Movies;
