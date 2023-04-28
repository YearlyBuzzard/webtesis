import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MedicalCard, Nav, DistanceDisplay, HeartRate, OxygenLevel, PatientTemperature, PatientBloodPressure, Profile, Slider, Dashboard, DoctorWelcomeCard, Note, AlertHistory, PatientList, HomeDashboard, PatientForm } from ".";
import ErrorAlert from './alerts/ErrorAlert';
import SuccessAlert from './alerts/SuccessAlert';

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  const [successAlerts, setSuccessAlerts] = useState([]);
  const [errorAlerts, setErrorAlerts] = useState([]);

  const addSuccessAlert = (message) => {
    setSuccessAlerts((prevAlerts) => [
      ...prevAlerts,
      { id: Date.now(), message },
    ]);
  };

  const addErrorAlert = (message) => {
    setErrorAlerts((prevAlerts) => [
      ...prevAlerts,
      { id: Date.now(), message },
    ]);
  };

  const removeSuccessAlert = (id) => {
    setSuccessAlerts((prevAlerts) =>
      prevAlerts.filter((alert) => alert.id !== id)
    );
  };

  const removeErrorAlert = (id) => {
    setErrorAlerts((prevAlerts) =>
      prevAlerts.filter((alert) => alert.id !== id)
    );
  };

  const renderAlerts = () => {
    if (successAlerts.length > 0 || errorAlerts.length > 0) {
      return (
        <div className="fixed bottom-4 right-4 flex flex-col space-y-4">
          {successAlerts.map((alert) => (
            <SuccessAlert
              key={alert.id}
              message={alert.message}
              onClose={() => removeSuccessAlert(alert.id)}
            />
          ))}
          {errorAlerts.map((alert) => (
            <ErrorAlert
              key={alert.id}
              message={alert.message}
              onClose={() => removeErrorAlert(alert.id)}
            />
          ))}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-200 fulls-creen">
      {!isDashboard && <Nav />}
      <Routes>
        <Route path="/perfil" element={<Profile />} />
        <Route path="/" element={
          <div className="grid grid-cols-3 gap-8 p-8">
            <div className="col-span-3 md:col-span-1 h-[320px] bg-white p-6 shadow-lg rounded-xl flex justify-center items-center">
              <HeartRate bpm={102} />
            </div>
            <div className="col-span-3 md:col-span-1 h-[320px] bg-white p-6 rounded-xl flex justify-center items-center">
                <OxygenLevel level={90} />
            </div>

            <div className="col-span-3 md:col-span-1 h-[320px] bg-white p-6 shadow-lg rounded-xl flex justify-center items-center">
              {/* Aquí va el espacio para la foto */}
            </div>
            <div className="col-span-3 md:col-span-2 h-[320px]">
              <div className="grid grid-cols-2 gap-8 h-full">
                <div className="bg-white p-6 shadow-lg rounded-xl flex justify-center items-center">
                  <PatientBloodPressure systolic={90} diastolic={102} />
                </div>
                <div className="bg-white p-6 shadow-lg rounded-xl flex justify-center items-center">
                  <PatientTemperature temperature={36} />
                </div>
              </div>
            </div>
            <div className="fixed bottom-4 right-4 flex flex-col space-y-4">
              {successAlerts.map((alert) => (
                <SuccessAlert
                  key={alert.id}
                  message={alert.message}
                  onClose={() => removeSuccessAlert(alert.id)}
                />
              ))}
              {errorAlerts.map((alert) => (
                <ErrorAlert
                  key={alert.id}
                  message={alert.message}
                  onClose={() => removeErrorAlert(alert.id)}
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