import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FiLogIn, FiLogOut, FiUserPlus, FiUser, FiMenu } from 'react-icons/fi'
import Logo from '../../images/query-llama-logo.svg'

import MobileMenu from '../MobileMenu';
import Auth from '../../utils/auth';

const Header = () => {
  const [inMoblieViewport, setViewport] = useState(false);
  const [mobileMenuOpen, setMenuOpen] = useState(false);

  console.log(inMoblieViewport);

  const handleMenuOpen = () => {
    setMenuOpen(true);
    document.body.style.overflow = "hidden";
 };

 const handleMenuClose = () => {
  setMenuOpen(false);
  document.body.style.overflow = "scroll";
}

  useEffect(() => {
    function handleResize() {
      setViewport(window.innerWidth < 640);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        {inMoblieViewport ? (
          <>
          <IconContext.Provider value={{ className: "header-icons", size: 36 }}>
          <div className='login-signup-ui'>
            <FiMenu className='menu-icon' onClick={handleMenuOpen} />
          </div>
          </IconContext.Provider>
          {mobileMenuOpen ? <MobileMenu handleClose={handleMenuClose} /> : null}
          </>
          
        ) : (
          <IconContext.Provider value={{ className: "header-icons", size: 24 }}>
          <div className='login-signup-ui'>
            {Auth.loggedIn() ? (
              <>
                <Link className="" to="/me">
                  <FiUser /> {Auth.getProfile().data.username}
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
        )
        }
        </div>
    </header>
  );
};

export default Header;
