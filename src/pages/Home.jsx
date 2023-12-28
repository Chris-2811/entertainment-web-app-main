import React, { useContext, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Trending from '../components/Trending';
import Recommended from '../components/Recommended';
import SearchContext from '../context/SearchContext';
import SearchResults from '../components/SearchResults';

function Home() {
  const { searchResults, setSearchResults } = useContext(SearchContext);

  return (
    <>
      <SearchBar />
      {searchResults ? (
        <SearchResults />
      ) : (
        <div>
          <Trending />
          <Recommended />
        </div>
      )}
    </>
  );
}

export default Home;
