import React from 'react';
import { NavLink } from 'react-router-dom';
import '../navbar.css'
import './navbarUser.css'
import { paths } from '../../../Additional/paths';

function NavbarUser({ logout })  {
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <NavLink exact to={paths.HOME} className="navbar-logo">
          <img className="navbar-logo" src="/images/connect.png" alt="Logo" />
        </NavLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink exact to={paths.WAITING} className="nav-links" activeclassname="active">
              Waiting room
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact to={paths.ROOM} className="nav-links" activeclassname="active">
              Room
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact to={paths.PROFILE} className="nav-links" activeclassname="active">
              Profile
            </NavLink>
          </li>
          <li className="nav-item-signout">
            <NavLink exact to={paths.SIGNIN} className="nav-links-signout" onClick={handleLogout}>
              Sign out
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavbarUser;
