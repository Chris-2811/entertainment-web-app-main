import React from 'react';
import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import {
  arrayUnion,
  doc,
  updateDoc,
  arrayRemove,
  getDoc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useContext } from 'react';
import video from '../assets/icon-category-movie.svg';
import show from '../assets/icon-category-tv.svg';
import placeholder from '../assets/placeholder.png';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Bookmark from './ Bookmark';

function MediaCard({ item, id, trending }) {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const genres = {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History: 36,
    Horror: 27,
    Music: 10402,
    Mystery: 9648,
    Romance: 10749,
    'Science Fiction': 878,
    'TV Movie': 10770,
    Thriller: 53,
    War: 10752,
    Western: 37,
    'Action & Adventure': 10759,
    Kids: 10762,
    News: 10763,
    Reality: 10764,
    'Sci-Fi & Fantasy': 10765,
    Soap: 10766,
    Talk: 10767,
    'War & Politics': 10768,
  };

  const date =
    item.type === 'Movie' || item.media_type === 'movie'
      ? item.release_date
      : item.first_air_date;
  let year;

  if (date !== undefined) {
    year = date.split('-')[0];
  }

  function handleClick(e) {
    const id = e.currentTarget.parentElement.parentElement.id;
    if (
      e.target.classList.contains('bookmark') ||
      e.target.parentElement.classList.contains('bookmark')
    ) {
      return;
    }

    if (
      e.currentTarget.parentElement.parentElement.getAttribute('data-type') ===
        'Movie' ||
      e.currentTarget.parentElement.parentElement.getAttribute('data-type') ===
        'movie'
    ) {
      navigate(`/movie-details/${id}`);
    } else {
      navigate(`/show-details/${id}`);
    }
  }

  return (
    <div
      className={`relative cursor-pointer rounded-lg overflow-hidden ${
        trending
          ? 'min-w-[280px] md:min-w-[470px] md:h-[230px] overflow-hidden min-h-[180px] rounded-lg'
          : ''
      }`}
      id={item.id}
      data-type={
        item.type === 'Movie' || item.media_type === 'movie' ? 'Movie' : 'tv'
      }
    >
      <Bookmark item={item} user={user} />

      <div className={`relative ${trending ? 'min-h-[180px]' : ''}`}>
        <img
          src={
            item.poster_path && !trending
              ? `https://image.tmdb.org/t/p/original${item.poster_path}`
              : item.backdrop_path && trending
              ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
              : placeholder
          }
          className={`rounded-lg object-cover w-full  ${
            trending ? 'min-h-[180px]' : ''
          }`}
        />
        <div
          onClick={handleClick}
          className="absolute w-full h-full top-0 left-0 bg-black/0 hover:bg-black/40 transition-all duration-200 rounded-lg"
        ></div>
      </div>

      {!trending ? (
        <>
          <div className="text-white/50 flex items-center gap-2 mt-2 ">
            <p className="">
              {!item.release_date && !item.first_air_date ? '' : year}
            </p>
            <p>·</p>
            <div className="flex items-center gap-1">
              <img src={item.type === 'Movie' ? video : show} alt="" />
              <p>
                {item.type === 'Movie' || item.media_type === 'movie'
                  ? 'Movie'
                  : 'TV'}
              </p>
            </div>
            <p>·</p>
            <p>
              {item.genre_ids
                .map((value) => {
                  for (let key in genres) {
                    if (genres[key] === value) {
                      return key;
                    }
                  }
                })
                .slice(0, 1)
                .join(', ')}
            </p>
          </div>
          <h3 className="font-semibold">
            {item.type === 'Movie' || item.media_type === 'movie'
              ? item.title
              : item.original_name}
          </h3>
        </>
      ) : (
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-[0.375rem] text-white fs-300">
            <p className="">
              {' '}
              {!item.release_date && !item.first_air_date ? '' : year}
            </p>
            <p className="">·</p>
            <div className="flex items-center gap-1">
              <img src={item.media_type === 'movie' ? video : show} alt="" />
              <p>{item.media_type === 'movie' ? 'Movie' : 'TV'}</p>
            </div>

            <p></p>
          </div>
          <h3 className="fs-500 font-semibold">
            {' '}
            {item.type === 'Movie' || item.media_type === 'movie'
              ? item.title
              : item.original_name}
          </h3>
        </div>
      )}
    </div>
  );
}

export default MediaCard;
