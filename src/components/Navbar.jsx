import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { FaUser } from 'react-icons/fa';
import { ReactComponent as HomeIcon } from '../assets/icon-nav-home.svg';
import { ReactComponent as MoviesIcon } from '../assets/icon-nav-movies.svg';
import { ReactComponent as ShowsIcon } from '../assets/icon-nav-tv-series.svg';
import { ReactComponent as BookmarkIcon } from '../assets/icon-nav-bookmark.svg';
import avatar from '../assets/image-avatar.png';
import AuthContext from '../context/AuthContext';

function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container-nav md:mt-6 bg-mirage py-[1.125rem] flex justify-between items-center md:rounded-lg lg:mt-8  lg:max-h-[960px] lg:h-[83.5vh] lg:w-[96px] lg:flex-col lg:justify-start lg:rounded-[20px] lg:pt-[2.4rem] lg:pb-8">
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
        className="rounded-full border border-white hover:bg-white/50  cursor-pointer  mt-auto p-2  "
      >
        <FaUser
          size={14}
          fill="white"
          className="-translate-y-[0.05rem] opacity-100"
        />
      </Link>
    </div>
  );
}

export default Navbar;
