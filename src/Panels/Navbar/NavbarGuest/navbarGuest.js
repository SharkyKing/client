import React from 'react';
import { NavLink } from 'react-router-dom';
import '../navbar.css'
import { paths } from '../../../Additional/paths';
import {getText} from '../../../Languages/languages'
import Cookies from 'universal-cookie';

function NavbarGuest() {
  const cookies = new Cookies();
  const lang = cookies.get('lang');

  return (
    <nav className="navbar">
      <div className="container">
        <NavLink to={paths.HOME} className="navbar-logo">
          <img className="navbar-logo" src="/images/connect.png" alt="Logo" />
        </NavLink>
        <ul className="nav-menu">
        <li className="nav-item">
            <NavLink to={paths.MEETINGSIGNUP} className="nav-links" activeclassname="active">
              Registruotis
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={paths.GUESTROOM} className="nav-links" activeclassname="active">
              {getText('navbarGuest.connect',lang)}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={paths.HOME} className="nav-links" activeclassname="active">
              {getText('navbarGuest.home',lang)}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={paths.SIGNIN} className="nav-links" activeclassname="active">
              {getText('navbarGuest.signin',lang)}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={paths.SIGNUP} className="nav-links" activeclassname="active">
              {getText('navbarGuest.signup',lang)}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavbarGuest;
