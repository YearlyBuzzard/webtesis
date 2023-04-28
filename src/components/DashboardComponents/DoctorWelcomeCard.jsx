import React from 'react';

const DoctorWelcomeCard = () => {
  return (
    <div className="bg-white rounded-lg p-4 flex flex-col md:flex-row justify-center items-center">
      <span className="flex items-center justify-center w-20 h-20 bg-slate-200 text-slate-600 border border-slate-300 uppercase font-semibold text-xl mx-2 md:mx-4 rounded-full">
        jt
      </span>
      <div className="text-center md:text-left">
        <h2 className="text-lg font-medium text-gray-800 mb-1">
          ¡Bienvenido, Dr. Martínez!
        </h2>
        <p className="text-sm text-gray-600">
          Le deseamos un excelente día en su práctica médica.
        </p>
      </div>
    </div>
  );
};

export default DoctorWelcomeCard;
