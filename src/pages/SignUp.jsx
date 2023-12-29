import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import OAuth from '../components/OAuth';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [messages, setMessages] = useState({});
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    let newMessages = {};

    if (!email) {
      newMessages = { ...newMessages, email: 'Can/t be blank' };
    }

    if (!password) {
      newMessages = { ...newMessages, password: 'Can/t be blank' };
    }

    if (!password2) {
      newMessages = { ...newMessages, password2: 'Can/t be blank' };
    }

    if (password !== password2) {
      newMessages = { ...newMessages, match: 'Passwords do not match!' };
    }

    if (!email || !password || !password2 || password !== password2) {
      setMessages(newMessages);
      return;
    }

    try {
      await signUp(email, password);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mycontainer">
      <div className="bg-mirage text-white max-w-[440px] rounded-[20px] mx-auto mt-[2rem] px-6 pt-6 pb-[1.625rem]">
        <h1 className="fs-900">Sign Up</h1>
        <form onSubmit={handleSubmit} className="mt-10">
          <div
            className={`form-control border-b-waikawa-gray   flex items-baseline justify-between  border-b ${
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
              <small className="text-sunset-orange">{messages.email}</small>
            )}
          </div>
          <div
            className={`form-control border-b-waikawa-gray   flex items-baseline justify-between border-b ${
              messages.password ? 'border-sunset-orange' : ''
            }`}
          >
            <input
              type="password"
              className="bg-transparent outline-none caret-sunset-orange w-[70%] pt-6 pb-4"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {messages.password && (
              <small className="text-sunset-orange">{messages.password}</small>
            )}
          </div>
          <div
            className={`form-control border-b-waikawa-gray  relative flex items-baseline justify-between border-b mb-10 ${
              messages.password2 ? 'border-sunset-orange' : ''
            }`}
          >
            <input
              type="password"
              className="bg-transparent outline-none caret-sunset-orange w-[70%] pt-6 pb-4"
              placeholder="Repeat Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            {messages.password2 && (
              <small className="text-sunset-orange">{messages.password2}</small>
            )}

            {messages.match && (
              <small
                className="absolute top-[4.3125rem] text-sunset-orange
            "
              >
                {messages.match}
              </small>
            )}
          </div>
          <button
            type="submit"
            className="bg-sunset-orange w-full rounded-md text-white hover:text-vulcan hover:bg-white py-[0.875rem] mb-6"
          >
            Create an account
          </button>
        </form>
        <OAuth />
        <div className="text-center">
          <p>
            Already have an account?
            <Link to="/log-in">
              <span className="text-sunset-orange ml-2">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
