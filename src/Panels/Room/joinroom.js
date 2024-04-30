import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "./Socket";
import CryptoJS from 'crypto-js';

function JoinRoom() {
  const [room, setRoomID] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();
  const randomEmail = CryptoJS.lib.WordArray.random(20).toString(CryptoJS.enc.Hex); // Generating a random string

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { randomEmail, room });
    },
    [randomEmail, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);


  return (
    <div>
      <h1>Home</h1>
      <input
        type="text"
        value={room}
        onChange={(e) => setRoomID(e.target.value)}
        placeholder="Enter Room ID"
      />
      <button onClick={handleSubmitForm}>Join Room</button>
    </div>
  );
}

export default JoinRoom;
