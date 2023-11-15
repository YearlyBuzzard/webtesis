import React from 'react';

const DoctorWelcomeCard = ({ firstName, lastName }) => {
  const initials = `${firstName ? firstName[0] : ''}${lastName ? lastName[0] : ''}`;

  return (
    <div className="bg-white rounded-lg p-6 flex flex-col md:flex-row items-center space-x-4">
      <span className="flex items-center justify-center w-24 h-24 bg-blue-100 text-blue-800 border border-blue-300 uppercase font-bold text-2xl rounded-full">
        {initials}
      </span>
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          ¡Bienvenido, Dr/a. {lastName || ''}!
        </h2>
        <p className="text-gray-600">
          Le deseamos un excelente día en su práctica médica.
        </p>
      </div>
    </div>
  );
};

export default DoctorWelcomeCard;
