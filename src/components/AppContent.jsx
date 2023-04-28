import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MedicalCard, Nav, DistanceDisplay, HeartRate, OxygenLevel, PatientTemperature, PatientBloodPressure, Profile, Slider, Dashboard, DoctorWelcomeCard, Note, AlertHistory, PatientList, HomeDashboard, PatientForm } from ".";
import ErrorAlert from './alerts/ErrorAlert';

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  const [alerts, setAlerts] = useState([]);

  const addAlert = (message) => {
    setAlerts((prevAlerts) => [
      ...prevAlerts,
      { id: Date.now(), message },
    ]);
  };

  const removeAlert = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  return (
    <div className="bg-gradient-to-b from-blue-200 fulls- creen">
      {!isDashboard && <Nav />}
      <Routes>
        <Route path="/perfil" element={<Profile />} />
        <Route path="/" element={
          <div className="grid grid-cols-3 gap-8 p-8">
            <div className="col-span-3 md:col-span-1 h-[320px] bg-white p-6 shadow-lg rounded-xl flex justify-center items-center">
              <HeartRate bpm={95} />
            </div>
            <div className="col-span-3 md:col-span-1 h-[320px] bg-white p-6 shadow-lg rounded-xl flex justify-center items-center">
              <OxygenLevel level={98} />
            </div>
            <div className="col-span-3 md:col-span-1 h-[320px] bg-white p-6 shadow-lg rounded-xl flex justify-center items-center">
              {/* Aquí va el espacio para la foto */}
            </div>
            <div className="col-span-3 md:col-span-2 h-[320px]">
              <div className="grid grid-cols-2 gap-8 h-full">
                <div className="bg-white p-6 shadow-lg rounded-xl flex justify-center items-center">
                  <PatientBloodPressure systolic={120} diastolic={80} />
                </div>
                <div className="bg-white p-6 shadow-lg rounded-xl flex justify-center items-center">
                  <PatientTemperature temperature={38.8} />
                </div>
              </div>
            </div>
            <div className="fixed bottom-4 right-4 flex flex-col space-y-4">
              {alerts.map((alert) => (
                <ErrorAlert
                  key={alert.id}
                  message={alert.message}
                  onClose={() => removeAlert(alert.id)}
                />
              ))}
            </div>
          </div>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default AppContent;
