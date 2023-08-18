import React, { useState, useEffect } from 'react';
import './style/Setting.css';
import { useDispatch } from 'react-redux';
import { logout } from './redux/actions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Setting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    email: '',
    bio: '',
    profilePicture: 'https://api.realworld.io/images/smiley-cyrus.jpeg'
  });


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('https://node-express-conduit.appspot.com/api/user', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then(response => {
          const userData = response.data.user;
          setUser({
            username: userData.username,
            email: userData.email,
            bio: userData.bio
          });
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/');
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };


  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Handle the case where the token is not available
        return;
      }

      const response = await axios.put(
        'https://node-express-conduit.appspot.com/api/user',
        {
          user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            image: user.profilePicture // Use the profilePicture property here
          }
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Update user information in the local state
        const userData = response.data.user;
        setUser({
          username: userData.username,
          email: userData.email,
          bio: userData.bio,
          profilePicture: userData.image // Update the profilePicture property here
        });
        alert('User information updated successfully.');

        // Navigate to the Profile component
        navigate('/Profile', { state: { updatedProfilePicture: user.profilePicture } });
      } else {
        // Handle other response statuses if needed
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      // Handle errors here
    }
  };


  return (
    <div className='settings-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Your Settings</h1>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='URL of profile picture'
                    name='profilePicture'
                    value={user.profilePicture}
                    onChange={handleInputChange}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='text'
                    placeholder='Your Name'
                    name='username'
                    value={user.username}
                    onChange={handleInputChange}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <textarea
                    className='form-control form-control-lg'
                    rows='8'
                    placeholder='Short bio about you'
                    name='bio'
                    value={user.bio}
                    onChange={handleInputChange}
                  ></textarea>
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='email'
                    placeholder='Email'
                    name='email'
                    value={user.email}
                    onChange={handleInputChange}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='password'
                    placeholder='New Password'
                    id='passw'
                  />
                </fieldset>
                <button
                  className='btnSt'
                  type='submit'
                >
                  Update Settings
                </button>
                <hr />
                <button className='btnLogout' onClick={handleLogout}>
                  Or click here to logout.
                </button>
              </fieldset>


            </form>

          </div>
        </div>
      </div>
    </div>
  );

};

export default Setting;
