import React from 'react';
import { NavLink } from 'react-router-dom';
import '../navbar.css'
import './navbarUser.css'
import { paths } from '../../../Additional/paths';
import {getText} from '../../../Languages/languages'
import Cookies from 'universal-cookie';

function NavbarUser({ logout })  {
  const cookies = new Cookies();
  const lang = cookies.get('lang');

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <NavLink to={paths.HOME} className="navbar-logo">
          <img className="navbar-logo" src="/images/connect.png" alt="Logo" />
        </NavLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to={paths.WAITING} className="nav-links" activeclassname="active">
              {getText('navbarUser.waiting',lang)}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={paths.JOINROOM} className="nav-links" activeclassname="active">
              {getText('navbarUser.room',lang)}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={paths.PROFILE} className="nav-links" activeclassname="active">
              {getText('navbarUser.profile',lang)}
            </NavLink>
          </li>
          <li className="nav-item-signout">
            <NavLink to={paths.SIGNIN} className="nav-links-signout" onClick={handleLogout}>
              {getText('navbarUser.signout',lang)}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavbarUser;
