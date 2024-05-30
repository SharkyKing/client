import React, { useRef, useEffect } from 'react';

const VideoComponent = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Access the webcam and microphone
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        // Set the video source to the stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((error) => {
        console.error('Error accessing media devices.', error);
      });

    // Clean up function to stop the stream
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default VideoComponent;
