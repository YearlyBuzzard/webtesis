import React from 'react';
import DoctorWelcomeCard from './DoctorWelcomeCard';
import PatientTable from './PatientTable';
import AlertHistory from './AlertHistoryHome';
import Note from './Note';

const notes = [
  'Nota 1',
  'Nota 2',
  'Nota 3',
  'Nota 4',
  'Nota 5',
];

const HomeDashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row h-full gap-4 overflow-x-hidden">
      <div className="flex flex-col w-full lg:w-3/5 p-4">
        <div className="bg-white p-6 shadow-lg rounded-xl">
          <DoctorWelcomeCard />
        </div>
        <div className="bg-white p-6 shadow-lg rounded-xl mt-4">
          <PatientTable />
        </div>
      </div>

      <div className="flex flex-col w-full lg:w-2/5 p-4 space-y-4 lg:mr-4">
        <div className="bg-white p-6 shadow-lg rounded-xl">
          <AlertHistory />
        </div>

        <div className="bg-white p-6 shadow-lg rounded-xl">
          <Note notes={notes} />
        </div>
        <div className="bg-white p-6 shadow-lg rounded-xl">
          <h2 className="text-xl font-bold mb-2">Opción 6</h2>
          <p className="text-gray-600">Contenido de la opción 6</p>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
