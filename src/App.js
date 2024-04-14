import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarUser from './Panels/Navbar/NavbarUser/navbarUser.js';
import NavbarGuest from './Panels/Navbar/NavbarGuest/navbarGuest.js';
import React, { useState } from 'react';
import { paths } from './Additional/paths';
import {SignIn, SignUp, Home, Room, Waiting} from './Panels/imports.js'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <Router>
        <div className="App">
          {isLoggedIn ? <NavbarUser logout={logout} /> : <NavbarGuest />}
          <Routes>
            <Route exact path={paths.HOME} element={<Home />} />
            <Route path={paths.SIGNIN} element={<SignIn login={login}  />} />
            <Route path={paths.SIGNUP} element={<SignUp login={login}/>} />
            <Route path={paths.ROOM} element={<Room />} />
            <Route path={paths.WAITING} element={<Waiting />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
