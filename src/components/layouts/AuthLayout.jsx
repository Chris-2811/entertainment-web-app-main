import React from 'react';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

function AuthLayout({ children }) {
  return (
    <>
      <header className="flex justify-center mt-12 md:mt-[5.5rem] lg:mt-[5rem]">
        <Link to="/home">
          <img src={logo} alt="logo" />
        </Link>
      </header>
      <main>{children}</main>
    </>
  );
}

export default AuthLayout;
