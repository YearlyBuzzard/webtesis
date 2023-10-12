import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AiOutlineCamera } from 'react-icons/ai';
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { MedicalCard, Nav, DistanceDisplay, HeartRate, OxygenLevel, PatientTemperature, PatientBloodPressure, Dashboard, CameraComponent } from ".";

let alertId = 0;

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const [alerts, setAlerts] = useState([]);
  const [bpm, setBpm] = useState(80);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBpm = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
      setBpm(newBpm);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const addAlert = (message, type) => {
    setAlerts((prevAlerts) => [
      ...prevAlerts,
      { id: alertId++, message, type },
    ]);
  };

  const removeAlert = (id) => {
    setAlerts((prevAlerts) =>
      prevAlerts.filter((alert) => alert.id !== id)
    );
  };

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

  return (
    <div className="bg-gradient-to-b from-blue-200 h-screen">
      {!isDashboard && <Nav />}
      <Routes>
        <Route path="/" element={
          <div className="grid grid-rows-2 grid-cols-3 gap-8 p-8 h-full">
            <div className="row-span-1 col-span-1 h-[320px] bg-white p-6 shadow-lg rounded-xl flex justify-center items-center">
              <HeartRate bpm={bpm} />
            </div>
            <div className="row-span-1 col-span-1 h-[320px] bg-white p-6 shadow-lg rounded-xl flex justify-center items-center">
              <OxygenLevel level={145300} />
            </div>
            <div className="row-span-1 col-span-1 h-[320px] bg-white p-6 shadow-lg rounded-xl flex items-center justify-center">
              <CameraComponent />
            </div>
            <div className="row-span-1 col-span-1 h-[320px] bg-white p-6 shadow-lg rounded-xl flex justify-center items-center">
              <PatientBloodPressure systolic={15} diastolic={82} />
            </div>
            <div className="row-span-1 col-span-1 h-[320px] bg-white p-6 shadow-lg rounded-xl flex justify-center items-center">
              <PatientTemperature initialTemperature={37.0} />
            </div>
          </div>
        } />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {renderAlerts()}
    </div>
  );
};

export default AppContent;

