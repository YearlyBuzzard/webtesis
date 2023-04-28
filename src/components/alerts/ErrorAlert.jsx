import React, { useState, useEffect } from 'react';

const ErrorAlert = ({ message, onClose }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAlert(false);
    }, 15000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleClose = () => {
    setShowAlert(false);
    onClose();
  };

  return (
    showAlert && (
      <div className="fixed bottom-4 right-4 max-w-md py-4 px-6 shadow-2xl shadow-red-800 rounded-lg bg-red-600">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 7a1 1 0 011 1v4a1 1 0 01-2 0V10a1 1 0 011-1z"
                />
                <circle cx="12" cy="17" r="1" />
              </svg>
              <h3 className="text-xl text-white font-semibold">ALERTA</h3>
            </div>
            <button onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <p className="text-white">{message}</p>
        </div>
      </div>
    )
  );
};

export default ErrorAlert;
