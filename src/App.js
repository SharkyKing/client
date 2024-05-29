import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarUser from './Panels/Navbar/NavbarUser/navbarUser.js';
import NavbarGuest from './Panels/Navbar/NavbarGuest/navbarGuest.js';
import React, { useState, useEffect, Navigate  } from 'react';
import { paths } from './Additional/paths';
import {SignIn, SignUp, Home, Room, RoomJoin, Waiting, ProfileMain, MeetingSignUp, Worktime } from './Panels/imports.js'
import Cookies from 'universal-cookie';
import { SocketProvider } from './Panels/Room/Socket.js'; 
import {AuthDetails, useSignOut} from './Secure/AuthDetails.js';
import { auth } from "./Secure/firebase.js";
import JoinRoom from './Panels/Room/joinroom.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cookies = new Cookies();
  
  cookies.set('lang', 'en', { path: '/' });

  const signOut = useSignOut();

  const logout = () => {
    setIsLoggedIn(false);
    signOut();
  };

  return (
    <>
      <Router>
        <div className="App">
          {isLoggedIn ? <NavbarUser logout={logout} /> : <NavbarGuest />}
          <Routes>
            <Route path={paths.HOME} element=           {isLoggedIn ? <ProfileMain /> : <Home />} />  /* Guest path */
            <Route path={paths.SIGNIN} element=         {isLoggedIn ? <ProfileMain /> : <SignIn />} />  /* Guest path */
            <Route path={paths.SIGNUP} element=         {isLoggedIn ? <ProfileMain /> : <SignUp />} />  /* Guest path */
            <Route path={paths.ROOM} element=           {isLoggedIn ? <Room /> : <Home />} />  /* Secure path */
            <Route path={paths.JOINROOM} element=       {isLoggedIn  ? <ProfileMain /> : <JoinRoom />} />    /* Guest path */
            <Route path={paths.WAITING} element=        {isLoggedIn ? <Waiting /> : <Home />} />  /* Secure path */
            <Route path={paths.PROFILE} element=        {isLoggedIn ? <ProfileMain /> : <Home />} />  /* Secure path */
            <Route path={paths.MEETINGSIGNUP} element=  {isLoggedIn ? <ProfileMain /> : <MeetingSignUp />} />  /* Guest path */
            <Route path={paths.WORKTIME} element=       {isLoggedIn ? <Worktime /> : <Home />} />  /* Secure path */
          </Routes>
        </div>
      </Router>
      <AuthDetails setIsLoggedIn={setIsLoggedIn}/>
    </>
  );
}

export default App;
