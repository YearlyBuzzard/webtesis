import React from 'react';

const CameraFeed = () => {
  const streamUrl = 'http://localhost:3001/camera-stream';  // Asegúrate de que esta URL apunte a tu servidor Node.js

  return (
    <div>
      <h2>Camera Feed</h2>
      <video src={streamUrl} controls autoPlay muted playsInline></video>
    </div>
  );
};

export default CameraFeed;