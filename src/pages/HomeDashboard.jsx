import React from 'react';
import DoctorWelcomeCard from '../components/DashboardComponents/DoctorWelcomeCard';
import PatientTable from '../components/DashboardComponents/PatientTable';
import AlertHistory from '../components/DashboardComponents/AlertHistoryHome';
import Note from '../components/DashboardComponents/Note';
import DistanceDisplay from '../components/DistanceDisplay'

const notes = [
  'Nota 1',
  'Nota 2',
  'Nota 3',
  'Nota 4',
  'Nota 5',
];

const HomeDashboard = () => {
  // Suponiendo que guardaste el nombre y apellido en el almacenamiento de la sesión
  const firstName = sessionStorage.getItem('userFirstName');
  const lastName = sessionStorage.getItem('userLastName');

  return (
    <div className="flex flex-col lg:flex-row h-full gap-4 overflow-x-hidden">
      <div className="flex flex-col w-full lg:w-3/5 p-4">
        <div className="bg-white p-6 shadow-lg rounded-xl">
          {/* Pasar firstName y lastName como props al DoctorWelcomeCard */}
          <DoctorWelcomeCard firstName={firstName} lastName={lastName} />
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
          <DistanceDisplay />
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
