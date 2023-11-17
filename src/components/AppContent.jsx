import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MedicalCard, Nav, DistanceDisplay, HeartRate, OxygenLevel, PatientTemperature, PatientBloodPressure, Dashboard, CameraComponent, UserProfile } from ".";

let alertId = 0;

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const [alerts, setAlerts] = useState([]);
  const [bpm, setBpm] = useState([]);

  // Agregar una alerta con un mensaje y tipo específico
  const addAlert = (message, type) => {
    setAlerts((prevAlerts) => [
      ...prevAlerts,
      { id: alertId++, message, type },
    ]);
  };

  // Eliminar una alerta por su ID
  const removeAlert = (id) => {
    setAlerts((prevAlerts) =>
      prevAlerts.filter((alert) => alert.id !== id)
    );
  };

  // Renderizar las alertas si hay alguna
  const renderAlerts = () => {
    if (alerts.length > 0) {
      return (
        <div className="fixed bottom-4 right-4 flex flex-col space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className={`bg-${alert.type}-200 p-4 rounded-md`}>
              {alert.message}
              <button className="ml-2 text-red-500" onClick={() => removeAlert(alert.id)}>Cerrar</button>
            </div>
          ))}
        </div>
      );
    } else {
      return null;
    }
  };

  const commonComponentContainerStyle = "row-span-1 col-span-1 h-[320px] bg-white p-6 shadow-lg rounded-xl flex justify-center items-center";

  return (
    <div className="bg-gradient-to-b from-blue-200 h-screen">
      {!isDashboard && <Nav />}
      <Routes>
        <Route path="/" element={
          <div className="grid grid-rows-2 grid-cols-3 gap-8 p-8 h-full">
            <div className={commonComponentContainerStyle}>
              <HeartRate bpm={bpm} />
            </div>
            <div className={commonComponentContainerStyle}>
              <OxygenLevel level={98} />
            </div>
            <div className={commonComponentContainerStyle}>
              {/* Comment or uncomment the next line depending on whether you want to include the CameraComponent */}
              {/* <CameraComponent /> */}
            </div>
            <div className={commonComponentContainerStyle}>
              <PatientBloodPressure systolic={120} diastolic={80} />
            </div>
            <div className={commonComponentContainerStyle}>
              <PatientTemperature initialTemperature={37.0} />
            </div>
          </div>
        } />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {renderAlerts()} {/* Renderizar las alertas */}
    </div>
  );
};

export default AppContent;
