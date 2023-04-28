import React from 'react';

const InfoAlert = ({ message }) => {
  return (
    <div className="fixed bottom-4 right-4 max-w-md py-4 px-6 shadow-2xl shadow-red-800 rounded-lg bg-red-600">
    <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl text-white font-semibold">Info</h3>
        </div>
        <p className="text-white">{message}</p>
      </div>
    </div>
  );
};

export default InfoAlert;
