import React from 'react';
import { NavLink } from 'react-router-dom';
import '../navbar.css'
import { paths } from '../../../Additional/paths';
import {getText} from '../../../Languages/languages'

function NavbarGuest() {
  return (
    <nav className="navbar">
      <div className="container">
        <NavLink to={paths.HOME} className="navbar-logo">
          <img className="navbar-logo" src="/images/connect.png" alt="Logo" />
        </NavLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink exact to={paths.HOME} className="nav-links" activeclassname="active">
              {getText('home','lt')}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={paths.SIGNIN} className="nav-links" activeclassname="active">
              Sign in
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={paths.SIGNUP} className="nav-links" activeclassname="active">
              Sign up
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavbarGuest;
