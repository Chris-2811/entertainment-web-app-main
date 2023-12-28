import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import {
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import bookmarkEmpty from '../assets/icon-bookmark-empty.svg';
import bookmarkFull from '../assets/icon-bookmark-full.svg';
import AuthContext from '../context/AuthContext';

function Bookmark({ item }) {
  const [bookmark, setBookmark] = useState(false);

  const { user } = useContext(AuthContext);

  const itemID = doc(db, 'users', `${user?.uid}`);

  async function saveItem() {
    if (user) {
      setBookmark(!bookmark);
    }
    if (bookmark) {
      if (item.type === 'Movie' || item.media_type === 'movie') {
        try {
          await updateDoc(itemID, {
            savedMovies: arrayRemove({
              id: item.id,
              title: item.title,
              poster_path: item.poster_path,
              type: 'Movie',
              release_date: item.release_date,
              genre_ids: item.genre_ids,
              bookmarked: true,
            }),
          });
        } catch (e) {
          console.error('Error removing movie: ', e);
        }
      } else {
        try {
          await updateDoc(itemID, {
            savedShows: arrayRemove({
              id: item.id,
              original_name: item.original_name,
              poster_path: item.poster_path,
              type: 'TV',
              first_air_date: item.first_air_date,
              genre_ids: item.genre_ids,
              bookmarked: true,
            }),
          });
        } catch (e) {
          console.error('Error removing show: ', e);
        }
      }
    } else {
      if (item.type === 'Movie' || item.media_type === 'movie') {
        try {
          await updateDoc(itemID, {
            savedMovies: arrayUnion({
              id: item.id,
              title: item.title,
              poster_path: item.poster_path,
              type: 'Movie',
              release_date: item.release_date,
              genre_ids: item.genre_ids,
              bookmarked: true,
            }),
          });
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      } else {
        try {
          await updateDoc(itemID, {
            savedShows: arrayUnion({
              id: item.id,
              original_name: item.original_name,
              poster_path: item.poster_path,
              type: 'TV',
              first_air_date: item.first_air_date,
              genre_ids: item.genre_ids,
              bookmarked: true,
            }),
          });
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      }
    }
  }

  useEffect(() => {
    const fetchBookmarkState = async () => {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const savedMovies = docSnap.data().savedMovies || [];
        const savedShows = docSnap.data().savedShows || [];
        const isBookmarked =
          savedMovies.some((movie) => movie.id === item.id) ||
          savedShows.some((show) => show.id === item.id);

        setBookmark(isBookmarked);
      } else {
      }
    };

    if (!user || !user.uid) {
      console.log('Useor user UID is not available'); // Debug log
      return;
    }

    fetchBookmarkState();
  }, [item, user]);

  return (
    <div
      className="absolute group bookmark bg-black/50 z-50 w-8 h-8 rounded-full grid  cursor-pointer place-items-center top-2 right-2"
      onClick={() => saveItem()}
    >
      <img
        className="bookmark"
        src={bookmark ? bookmarkFull : bookmarkEmpty}
        alt={bookmark ? 'bookmark-full' : 'bookmark-empty'}
      />
    </div>
  );
}

export default Bookmark;
