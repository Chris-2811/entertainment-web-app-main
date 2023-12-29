import React from 'react';
import googleIcon from '../assets/googleIcon.svg';
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function OAuth() {
  const location = useLocation();
  const navigate = useNavigate();

  async function onGoogleClick() {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  async function onGithubClick() {
    try {
      const provider = new GithubAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <p>{location.pathname === '/log-in' ? 'Log-in with' : 'Sign-up with'}</p>
      <button
        onClick={onGoogleClick}
        className="cursor-pointer flex justify-center items-center m-[1.125rem] p-3 w-12 h-12 bg-white rounded-full shadow-md"
      >
        <img src={googleIcon} alt="google" />
      </button>
    </div>
  );
}

export default OAuth;
