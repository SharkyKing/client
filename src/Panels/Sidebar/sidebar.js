import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">Logo</NavLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className="nav-links" activeClassName="active">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-links" activeClassName="active">About</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/services" className="nav-links" activeClassName="active">Services</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className="nav-links" activeClassName="active">Contact</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}