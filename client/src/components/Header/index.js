import React from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FiLogIn, FiLogOut, FiUserPlus, FiUser } from 'react-icons/fi'
import Logo from '../../images/query-llama-logo.svg'

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="header">
      <div className='header-positioning-container'>
        <div className="logo-title-container">
          <div className='logo-title-flex-wrapper'>
              <img src={Logo} alt="" />
              <Link className="" to="/">
                <h1 className="">QueryLlama</h1>
              </Link>
          </div>
        </div>
        <IconContext.Provider value={{ className: "header-icons", size: 24 }}>
          <div className='login-signup-ui'>
            {Auth.loggedIn() ? (
              <>
                <Link className="" to="/me">
                  <FiUser /> {Auth.getProfile().data.username}!
                </Link>
                <button className="" onClick={logout}>
                  Log Out
                  <FiLogOut />
                </button>
              </>
            ) : (
              <>
                <Link className="" to="/login">
                  Log In
                  <FiLogIn />
                </Link>
                <Link className="" to="/signup">
                  Sign Up
                  <FiUserPlus />
                </Link>
              </>
            )}
          </div>
          </IconContext.Provider>
        </div>
    </header>
  );
};

export default Header;
