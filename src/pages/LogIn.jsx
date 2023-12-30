import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import AuthContext from '../context/AuthContext';
import OAuth from '../components/OAuth';
import { useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showEyeIcon, setShowEyeIcon] = useState(true);
  const { logIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    let newMessages = {};

    if (!email) {
      newMessages = { ...newMessages, email: "Can't be empty" };
    }

    if (!password) {
      newMessages = { ...newMessages, password: "Can't be empty" };
      setShowEyeIcon(false);
    }

    if (!email || !password) {
      setMessages(newMessages);
      setTimeout(() => {
        setMessages({});
        setShowEyeIcon(true);
      }, 3000);
      return;
    }

    try {
      const userCredential = await logIn(email, password);
      navigate('/');
    } catch (error) {
      setMessages({ credentials: 'Email or Password wrong' });
    }
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleChange(e) {
    setPassword(e.target.value);
    setShowEyeIcon(true);
  }

  return (
    <div className="mycontainer">
      <div className="bg-mirage text-left text-white max-w-[440px] rounded-[20px] mx-auto mt-[2rem] px-6 pt-6 pb-[1.625rem]">
        <h1 className="fs-900">Login</h1>
        <form onSubmit={handleSubmit} className="mt-10">
          <div
            className={`form-control flex items-baseline justify-between border-b  border-b-waikawa-gray ${
              messages.email ? 'border-b-sunset-orange' : ''
            }`}
          >
            <input
              type="email"
              className="bg-transparent outline-none caret-sunset-orange pb-4 w-[70%]"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {messages.email && (
              <small className="font-sm text-sunset-orange">
                {messages.email}
              </small>
            )}
          </div>
          <div
            className={`form-control relative flex items-baseline justify-between border-b border-b-waikawa-gray mb-10 ${
              messages.password ? 'border-b-sunset-orange' : ''
            }`}
          >
            <input
              type={showPassword ? 'text' : 'password'}
              className="bg-transparent outline-none caret-sunset-orange w-[70%] pt-6 pb-4"
              placeholder="Password"
              value={password}
              onChange={(e) => handleChange(e)}
            />

            {showEyeIcon && (
              <button
                type="button"
                onClick={handleShowPassword}
                className="mr-2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            )}

            {messages.password && (
              <small className="font-sm text-sunset-orange">
                {messages.password}
              </small>
            )}

            {messages.credentials && (
              <small className="absolute top-[4.3125rem] font-sm text-sunset-orange">
                {messages.credentials}
              </small>
            )}
          </div>
          <button
            type="submit"
            className="bg-sunset-orange w-full rounded-md text-white hover:text-vulcan hover:bg-white py-[0.875rem] mb-6"
          >
            Login to your account
          </button>
        </form>
        <OAuth />
        <div className="text-center">
          <p>
            Don't have an account?
            <Link to="/sign-up">
              <span className="text-sunset-orange ml-2">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
