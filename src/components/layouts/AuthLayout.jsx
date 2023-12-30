import React from 'react';
import logo from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';

function AuthLayout({ children }) {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="px-6 lg:px-10 hidden md:block">
          <button
            onClick={() => navigate('/home')}
            className="text-white bg-transparent border py-2 rounded-md  px-6 mt-6 border-sunset-orange hover:bg-sunset-orange"
          >
            Go back
          </button>
        </div>
        <div className="flex justify-center mt-6  lg:mt-[5rem]">
          <Link to="/home">
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}

export default AuthLayout;
