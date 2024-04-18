import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarUser from './Panels/Navbar/NavbarUser/navbarUser.js';
import NavbarGuest from './Panels/Navbar/NavbarGuest/navbarGuest.js';
import React, { useState } from 'react';
import { paths } from './Additional/paths';
import {SignIn, SignUp, Home, Room, RoomJoin, Waiting, Profile} from './Panels/imports.js'
import Cookies from 'universal-cookie';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const login = (userID) => {
    setIsLoggedIn(true);
    const cookies = new Cookies();
    cookies.set('userID', userID, { path: '/' });
    console.log(cookies.get('userID'));
  };

  const logout = () => {
    setIsLoggedIn(false);
    const cookies = new Cookies();
    cookies.remove('userID');
  };

  return (
    <>
      <Router>
        <div className="App">
          {isLoggedIn ? <NavbarUser logout={logout} /> : <NavbarGuest />}
          <Routes>
            <Route path={paths.HOME} element={<Home />} />
            <Route path={paths.SIGNIN} element={<SignIn login={login}  />} />
            <Route path={paths.SIGNUP} element={<SignUp login={login}/>} />
            <Route path={paths.ROOM} element={<Room />} />
            <Route path={paths.JOINROOM} element={<RoomJoin/>}/>
            <Route path={paths.WAITING} element={<Waiting />} />
            <Route path={paths.PROFILE} element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
