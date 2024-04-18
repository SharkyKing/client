import React, { useEffect, useMemo, useRef, useState } from "react";
import {Button, Textbox} from '../../Components/imports.js'
import './room.css'
import io from 'socket.io-client';
import servers from '../../Additional/server.js'
import { useParams } from 'react-router-dom';

function Room() {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const [socket, setSocket] = useState(null);
  const { roomId } = useParams(); 
  let localStream;
  let peerConnection;
  const iceCandidatesQueue = [];

  

  useEffect(() => {
    const socket = io(servers.SIGNALING_SERVER_URL);
    setSocket(socket);

    const initializePeerConnection = async () => {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = localStream;

        peerConnection = new RTCPeerConnection();

        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit('ice-candidate', { roomId, candidate: event.candidate });
          }
        };

        peerConnection.ontrack = (event) => {
          console.log('Received remote stream:', event.streams[0]);
          remoteVideoRef.current.srcObject = event.streams[0];
        };

        const offer = await peerConnection.createOffer();

        await peerConnection.setLocalDescription(offer);

        socket.emit('offer', { roomId, offer });
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    initializePeerConnection();
    
    socket.on('offer', async (offer) => {
      try {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('answer', { roomId, answer });
      } catch (error) {
        console.error('Error creating or setting answer:', error);
      }
    });

    socket.on('connect', () => {
      console.log('Connected to signaling server');
      socket.emit('join-room', roomId);
    });

    socket.on('disconnection', () => {
      console.log('LOCAL DISCONNECT')
      remoteVideoRef.current.srcObject = null;
    });

    socket.on('ice-candidate', ({ candidate }) => {
      console.log('Received ICE candidate:', candidate);
      const iceCandidate = parseIceCandidate(candidate);
      if (iceCandidate) {
        console.log('PARSED', peerConnection.remoteDescription);
        if (peerConnection.remoteDescription) {
          peerConnection.addIceCandidate(iceCandidate)
          .then(() => {
            console.log('Added ICE candidate successfully');
          })
          .catch((error) => {
            console.error('Error adding ICE candidate:', error);
          });
      } else {
        iceCandidatesQueue.push(iceCandidate);
      }
    } else {
      console.error('Invalid ICE candidate:', candidate);
    }});

    socket.on('answer', async (answer) => {
      try {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      } catch (error) {
        console.error('Error setting remote description:', error);
      }
    });

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (peerConnection) {
        peerConnection.close();
      }
      if (socket) {
        socket.close();
      }
    };
  }, [roomId]);

  function processIceCandidatesQueue() {
    while (iceCandidatesQueue.length > 0) {
      const iceCandidate = iceCandidatesQueue.shift();
      peerConnection.addIceCandidate(iceCandidate)
        .then(() => {
          console.log('Added ICE candidate from queue successfully');
        })
        .catch((error) => {
          console.error('Error adding ICE candidate from queue:', error);
        });
    }
  }

  function parseIceCandidate(candidateStr) {
    try {
      const [_, sdpMid, sdpMLineIndex, candidate] = candidateStr.split(' ');
      return new RTCIceCandidate({
        candidate: candidate,
        sdpMid: sdpMid,
        sdpMLineIndex: parseInt(sdpMLineIndex)
      });
    } catch (error) {
      console.error('Error parsing ICE candidate:', error);
      return null;
    }
  }

  const handleHangUp = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    if (peerConnection) {
      peerConnection.close();
    }
    if (socket) {
      socket.close();
    }
    // Redirect back to the home page
    window.location.href = '/';
  };

  return (
    <div>
      <h1>Room: {roomId}</h1>
      <video ref={localVideoRef} autoPlay muted></video>
      <video ref={remoteVideoRef} autoPlay></video>
      <button onClick={handleHangUp}>Hang Up</button>
    </div>
  );
}

export default Room;

