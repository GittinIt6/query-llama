import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import { FiArrowLeftCircle } from "react-icons/fi";

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Footer from '../components/Footer';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  const location = useLocation();
  const history = useHistory();

  return (
    <>
    <main>
      <div className='login-signup-card'>
        <IconContext.Provider value={{ className: "go-back-button", size: 20 }}>
          {location.pathname !== '/' && (
            <button 
              className='go-back-button' 
              onClick={() => history.goBack()}>
              <FiArrowLeftCircle /> Go back
            </button>
              )}
          </IconContext.Provider>
        <div className='login-signup-content'>
          <h4>Sign Up</h4>
          <div>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form className='login-signup-fieldset' onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="primary-button login-signup-btn"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Sign Up
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
};

export default Signup;
