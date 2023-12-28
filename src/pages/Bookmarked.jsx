import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import SearchBar from '../components/SearchBar';
import AuthContext from '../context/AuthContext';
import BookmarkedMovies from '../components/BookmarkedMovies';
import BookmarkedShows from '../components/BookmarkedShows';

function Bookmarked() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [search, setSearch] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.uid}`), (doc) => {
      const data = doc.data();
      setMovies(data?.savedMovies);
      setShows(data?.savedShows);
    });
  }, [user]);

  console.log(movies);
  console.log(shows);
  console.log(user.email);

  return (
    <div className="pb-[3.5rem]">
      <SearchBar setSearch={setSearch} />
      <BookmarkedMovies
        movies={movies.filter((movie) =>
          movie.title.toLowerCase().includes(search.toLowerCase())
        )}
      />
      <BookmarkedShows
        shows={shows.filter((show) =>
          show.original_name.toLowerCase().includes(search.toLowerCase())
        )}
      />
    </div>
  );
}

export default Bookmarked;
