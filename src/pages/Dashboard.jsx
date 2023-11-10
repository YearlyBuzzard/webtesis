import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Slider, HomeDashboard, PatientList, PatientForm } from '../components';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [showPatientForm, setShowPatientForm] = useState(false);

  const handleAddPatient = (patient) => {
    setPatients([...patients, patient]);
  };

  const handleShowPatientForm = () => {
    setShowPatientForm(!showPatientForm);
  };

  return (
    <div className="bg-gradient-to-b from-blue-200 fulls-creen">

    <div className="h-screen w-screen flex overflow-x-hidden">
      <div className="fixed">
        <Slider />
      </div>
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <div className="ml-80">
                <HomeDashboard />
              </div>
            }
          />
          <Route
            path="/pacientes"
            element={
              <div className="ml-80">
                <div className="border border-gray-300 shadow-lg bg-white p-6 rounded-xl my-6 mx-6">
                  <PatientList patients={patients} />
                </div>
              </div>
            }
          />
          <Route
            path="/nuevo-paciente"
            element={
              <div className="ml-80">
                <div className="border border-gray-300 shadow-lg bg-white p-6 rounded-xl my-6 mx-6">
                  <PatientForm onSubmit={handleAddPatient} />
                </div>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
    </div>

  );
};

export default Dashboard;

