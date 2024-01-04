import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut, updateProfile } from 'firebase/auth';
import { db } from '../firebase';
import { collection, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { storage } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const { email, username, location, avatar } = formData;
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  console.log(selectedFile);

  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);

  console.log(auth.currentUser);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Update the user state

        // Fetch the user data from Firestore
        const userId = currentUser.uid;
        const userRef = doc(db, 'users', userId);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          setFormData(userSnapshot.data());
        } else {
          console.log('No such user!');
        }
      } else {
        // User is not signed in
        navigate('/home');
      }

      setLoading(false); // Update the loading state
    });

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditMode(!editMode);

    const userId = user.uid;

    const dataToUpdate = {};
    if (location) dataToUpdate.location = location;

    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, dataToUpdate);
    } catch (error) {
      console.log(error);
    }

    try {
      await updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: avatar,
      });
    } catch (error) {
      console.log(error);
    }

    if (selectedFile) {
      const storageRef = ref(storage, selectedFile.name);
      uploadBytes(storageRef, selectedFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);

          // Save the download URL in Firestore
          const userDocRef = doc(db, 'users', userId);
          setDoc(userDocRef, { photoURL: downloadURL }, { merge: true });
        });
      });
    }
  };

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  }

  function handleFileChange(e) {
    setSelectedFile(e.target.files[0]);
  }

  console.log(formData);

  return !loading ? (
    <div className="flex flex-col mt-8  min-h-screen px-4  md:px-6">
      <div className="px-6 py-8 mt-14 lg:mt-0 relative bg-mirage md:max-w-[450px] rounded-xl shadow-md flex items-center space-x-4">
        <div>
          <div className="text-xl font-medium text-white mb-4">My Profile</div>

          <div>
            <p className="text-gray-300">Email: {formData.email} </p>
            <p className="text-gray-300">Username: {formData.username}</p>
            <p className="text-gray-300">Location: {formData.location}</p>
          </div>

          <button
            onClick={handleEdit}
            className="mt-8 bg-sunset-orange  text-white font-bold py-2 px-4 rounded"
          >
            Edit Profile
          </button>
          {editMode && (
            <form className="mt-4 flex flex-col gap-4">
              <input
                type="text"
                name="email"
                onChange={handleInputChange}
                className="shadow appearance-none text-white bg-waikawa-gray caret-sunset-orange  rounded w-full py-2 px-3 placeholder:text-mirage leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email"
                value={formData.email}
              />
              <input
                type="text"
                name="username"
                onChange={handleInputChange}
                className="shadow appearance-none text-white bg-waikawa-gray caret-sunset-orange  rounded w-full py-2 px-3  placeholder:text-mirage leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Username"
                value={formData.username}
              />
              <input
                type="text"
                name="location"
                onChange={handleInputChange}
                className="shadow appearance-none text-white bg-waikawa-gray caret-sunset-orange  rounded w-full py-2 px-3 placeholder:text-mirage leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Location"
                value={formData.location}
              />

              <div className="form-control">
                <label
                  className="block text-gray-300 text-sm font-bold mb-2"
                  htmlFor="profilePicture"
                >
                  Upload Profile Picture
                </label>
                <input
                  name="avatar"
                  id="profilePicture"
                  type="file"
                  onChange={handleFileChange}
                  className="shadow appearance-none bg-waikawa-gray caret-sunset-orange  rounded w-full py-2 px-3 text-mirage placeholder:text-mirage leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="mt-4 bg-sunset-orange text-white font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </form>
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
  ) : (
    <div>Loading...</div>
  );
};

export default Profile;
