import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/query-llama-logo.svg'

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="">
      <div className="logo-title-container">
        <div className='logo-title-flex-wrapper'>
            <img src={Logo} alt="" />
            <Link className="" to="/">
              <h1 className="">QueryLlama</h1>
            </Link>
        </div>
      </div>
        <div className='login-signup-ui'>
          {Auth.loggedIn() ? (
            <>
              <Link className="" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="" to="/login">
                Login
              </Link>
              <Link className="" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
    </header>
  );
};

export default Header;
