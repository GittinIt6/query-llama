import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { IconContext } from 'react-icons/lib';
import { FiArrowLeftCircle } from "react-icons/fi";

import Footer from '../components/Footer';
import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  const location = useLocation();
  const history = useHistory();

  return (
    <>
    <main>
      <div>
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
          <h4>Login</h4>
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
                  Log In
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
      </div>
    </main>
    <Footer />
    </>
  );
};

export default Login;
