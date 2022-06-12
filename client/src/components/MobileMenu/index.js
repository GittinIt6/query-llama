import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FiLogIn, FiLogOut, FiUserPlus, FiUser, FiX } from 'react-icons/fi'
import LlamaGraphicSmall from '../../images/llama-graphic-sm.svg'

import Auth from '../../utils/auth';

const MobileMenu = (props) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    props.handleClose();
  };

  return (
    <>
    <div className="mobile-menu-container">
          <IconContext.Provider value={{ className: "header-icons", size: 34 }}>
          <div className='login-signup-ui'>
            <button id='close-button' onClick={props.handleClose}>
            <FiX className='close-icon' />
            </button>
              
            {Auth.loggedIn() ? (
              <>
                <Link className="" to="/me" onClick={props.handleClose}>
                {Auth.getProfile().data.username} <FiUser /> 
                </Link>
                <button className="" onClick={logout}>
                  Log Out
                  <FiLogOut />
                </button>
              </>
            ) : (
              <>
                <Link className="" to="/login" onClick={props.handleClose}>
                  Log In
                  <FiLogIn />
                </Link>
                <Link className="" to="/signup" onClick={props.handleClose}>
                  Sign Up
                  <FiUserPlus />
                </Link>
              </>
            )}
          </div>
          </IconContext.Provider>
          <img className='mobile-menu-llama' src={LlamaGraphicSmall} alt="red outline of an illustrated llama" />
        </div>
        </>
  );
};

export default MobileMenu;
