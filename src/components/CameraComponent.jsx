import React, { useRef, useState } from 'react';
import { AiOutlineVideoCamera, AiFillVideoCamera, AiOutlineFullscreen } from 'react-icons/ai';

const CameraComponent = () => {
  const [streaming, setStreaming] = useState(false);
  const videoRef = useRef(null);

  const startVideo = async () => {
    if (!streaming) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        setStreaming(true);
      } catch (err) {
        console.error("Error accessing the camera", err);
      }
    }
  };

  const stopVideo = () => {
    if (streaming) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
  
      tracks.forEach((track) => {
        track.stop();
      });
  
      videoRef.current.srcObject = null;
      setStreaming(false);
    }
  };

  const toggleVideo = () => {
    if (streaming) {
      stopVideo();
    } else {
      startVideo();
    }
  };

  const toggleFullscreen = () => {
    const videoElem = videoRef.current;

    if (videoElem.requestFullscreen) {
      videoElem.requestFullscreen();
    } else if (videoElem.mozRequestFullScreen) {
      videoElem.mozRequestFullScreen();
    } else if (videoElem.webkitRequestFullscreen) {
      videoElem.webkitRequestFullscreen();
    } else if (videoElem.msRequestFullscreen) {
      videoElem.msRequestFullscreen();
    }
  };

  return (
    <div className="relative z-20 m-4">
    <div className="h-[320px] rounded-xl overflow-hidden">
        <video className="w-full h-full object-cover" ref={videoRef} autoPlay />
        <div className="absolute bottom-2 left-2 z-10 flex">
          <button
            className={`h-8 w-8 rounded-full flex items-center justify-center ${
              streaming ? 'bg-red-500' : 'bg-green-500'
            }`}
            onClick={toggleVideo}
          >
            {streaming ? <AiFillVideoCamera /> : <AiOutlineVideoCamera />}
          </button>
          <button
            className="h-8 w-8 bg-blue-500 text-white font-semibold rounded flex items-center justify-center ml-2"
            onClick={toggleFullscreen}
          >
            <AiOutlineFullscreen />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraComponent;
