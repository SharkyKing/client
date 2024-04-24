// Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {getText} from '../../Languages/languages'
import Cookies from 'universal-cookie';

function Home() {
  const [roomId, setRoomId] = useState('');

  const handleJoinRoom = () => {
    window.location.href = `/room/${roomId}`;
  };

  return (
    <div>
      <h1>Home</h1>
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Enter Room ID"
      />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
}

export default Home;
