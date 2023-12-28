import React from 'react';
import SearchBar from '../components/SearchBar';
import ShowsList from '../components/ShowsList';
import { useContext } from 'react';
import SearchContext from '../context/SearchContext';
import SearchResults from '../components/SearchResults';

function Shows() {
  const { showSearchResults } = useContext(SearchContext);
  return (
    <>
      <SearchBar />
      {showSearchResults ? <SearchResults /> : <ShowsList />}
    </>
  );
}

export default Shows;
