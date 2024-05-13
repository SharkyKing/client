import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarUser from './Panels/Navbar/NavbarUser/navbarUser.js';
import NavbarGuest from './Panels/Navbar/NavbarGuest/navbarGuest.js';
import React, { useState } from 'react';
import { paths } from './Additional/paths';
import {SignIn, SignUp, Home, Room, RoomJoin, Waiting, Profile, MeetingSignUp, MeetingSignUpChoosePerson, MeetingSignUpChooseDate} from './Panels/imports.js'
import Cookies from 'universal-cookie';
import { SocketProvider } from './Panels/Room/Socket.js'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const cookies = new Cookies();
  
  cookies.set('lang', 'en', { path: '/' });

  const login = (userID) => {
    setIsLoggedIn(true);
    cookies.set('userID', userID, { path: '/' });
    cookies.set('logged', true, { path: '/' });
    console.log(cookies.get('userID'));
  };

  const logout = () => {
    setIsLoggedIn(false);
    cookies.set('logged', false, { path: '/' });
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
            <Route path={paths.MEETINGSIGNUP} element={<MeetingSignUp />} />
            <Route path={paths.MEETINGSIGNUPCHOOSEPERSON} element={<MeetingSignUpChoosePerson />}/>
            <Route path={paths.MEETINGSIGNUPCHOOSEDATE} element={<MeetingSignUpChooseDate />}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
