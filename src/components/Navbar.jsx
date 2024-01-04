import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { FaUser } from 'react-icons/fa';
import { ReactComponent as HomeIcon } from '../assets/icon-nav-home.svg';
import { ReactComponent as MoviesIcon } from '../assets/icon-nav-movies.svg';
import { ReactComponent as ShowsIcon } from '../assets/icon-nav-tv-series.svg';
import { ReactComponent as BookmarkIcon } from '../assets/icon-nav-bookmark.svg';
import avatar from '../assets/image-avatar.png';
import AuthContext from '../context/AuthContext';
import { auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Navbar() {
  const { user } = useContext(AuthContext);

  const [userPhoto, setUserPhoto] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchUserPhoto = async () => {
        const userId = user.uid;
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserPhoto(userData.photoURL);
          console.log(userPhoto);
        } else {
        }
      };

      fetchUserPhoto();
    } else {
      setUserPhoto(null);
    }
  }, [user]);

  return (
    <div className="container-nav md:mt-6 bg-mirage py-[1.125rem] flex justify-between items-center md:rounded-lg lg:mt-8  lg:max-h-[960px] lg:h-[84vh] lg:w-[96px] lg:flex-col lg:justify-start lg:rounded-[20px] lg:pt-[2.4rem] lg:pb-8">
      <NavLink to="/home">
        <img src={logo} alt="logo" className="h-[1.6125rem] w-8" />
      </NavLink>
      <nav
        aria-label="Primary-navigation"
        className="primary-navigation lg:mt-[4.5rem]"
      >
        <ul role="list" className="flex items-center gap-6 lg:flex-col">
          <NavLink to="/home">
            <HomeIcon />
          </NavLink>
          <NavLink to="/movies">
            <MoviesIcon />
          </NavLink>
          <NavLink to="/shows">
            <ShowsIcon />
          </NavLink>
          <NavLink to="/bookmarked">
            <BookmarkIcon />
          </NavLink>
        </ul>
      </nav>

      <Link
        to={user ? '/profile' : '/log-in'}
        className="rounded-full border flex items-center justify-center border-white hover:bg-white/50  cursor-pointer  mt-auto w-10 h-10 "
      >
        {userPhoto ? (
          <img src={userPhoto} className="w-8 h-8 rounded-full"></img>
        ) : (
          <FaUser
            size={14}
            fill="white"
            className="-translate-y-[0.05rem] opacity-100"
          />
        )}
      </Link>
    </div>
  );
}

export default Navbar;
