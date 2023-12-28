import React, { useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col mt-8  min-h-screen px-4  md:px-6">
      <div className="px-6 py-8 mt-14 lg:mt-0 relative bg-mirage md:max-w-[450px] rounded-xl shadow-md flex items-center space-x-4">
        <div>
          <div className="text-xl font-medium text-white mb-4">My Profile</div>
          <p className="text-gray-300">Email: {user.email} </p>
          <p className="text-gray-300">Username:</p>
          <p className="text-gray-300">Location: </p>
          <button
            onClick={handleEdit}
            className="mt-8 bg-sunset-orange  text-white font-bold py-2 px-4 rounded"
          >
            Edit Profile
          </button>
          {editMode && (
            <div className="mt-4 flex flex-col gap-4">
              <input
                type="text"
                name="email"
                onChange={handleInputChange}
                className="shadow appearance-none bg-waikawa-gray caret-sunset-orange  rounded w-full py-2 px-3 text-mirage placeholder:text-mirage leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email"
              />
              <input
                type="text"
                name="username"
                onChange={handleInputChange}
                className="shadow appearance-none bg-waikawa-gray caret-sunset-orange  rounded w-full py-2 px-3 text-mirage placeholder:text-mirage leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Username"
              />
              <input
                type="text"
                name="bio"
                onChange={handleInputChange}
                className="shadow appearance-none bg-waikawa-gray caret-sunset-orange  rounded w-full py-2 px-3 text-mirage placeholder:text-mirage leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Location"
              />

              <div className="form-control">
                <label
                  className="block text-gray-300 text-sm font-bold mb-2"
                  htmlFor="profilePicture"
                >
                  Upload Profile Picture
                </label>
                <input
                  id="profilePicture"
                  type="file"
                  className="shadow appearance-none bg-waikawa-gray caret-sunset-orange  rounded w-full py-2 px-3 text-mirage placeholder:text-mirage leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <button
                onClick={handleEdit}
                className="mt-4 bg-sunset-orange text-white font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="bg-sunset-orange text-white py-2 px-6 absolute right-0 md:right-[-8rem] -top-16 md:top-[0rem] rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
