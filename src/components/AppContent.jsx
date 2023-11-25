import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Routes, Route } from 'react-router-dom';
import UserProfile from "../pages/UserProfile";
import Spinner from "../assets/Spinner";
// Asegúrate de importar los componentes correctamente
import { Nav, HeartRate, OxygenLevel, PatientBloodPressure, PatientTemperature, Dashboard, CameraComponent} from '.';
import { toast } from 'react-toastify';

let alertId = 0;

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const [alerts, setAlerts] = useState([]);
  const [bpm, setBpm] = useState([]);
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      setIsLoading(true);
      try {
        // Asegúrate de reemplazar 'http://tuServidor/api/patients/' con la URL real de tu servidor
        const response = await fetch(`http://localhost:3001/api/patients/${patientId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPatientData(data);
      } catch (error) {
        console.error('Error al cargar datos del paciente:', error);
        toast.error('Error al cargar datos del paciente');
      } finally {
        setIsLoading(false);
      }
    };

    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);

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

  const commonComponentContainerStyle = "row-span-1 col-span-1 md:col-span-1 h-full bg-white p-6 shadow-lg rounded-xl flex justify-center items-center overflow-hidden";
  const ComponentContainerStyle = "md:row-span-2 md:col-span-1 h-full bg-white p-6 shadow-lg rounded-xl flex flex-col justify-start items-center overflow-hidden";

  return (
    <div className="bg-gradient-to-b from-blue-200 h-full">
      {!isDashboard && <Nav />}
      <Routes>
        <Route path="/" element={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            <div className={commonComponentContainerStyle}>
              <HeartRate bpm={bpm} />
            </div>
            <div className={commonComponentContainerStyle}>
              <OxygenLevel level={98} />
            </div>
            <div className={ComponentContainerStyle}>
              {isLoading ? <Spinner /> : <UserProfile patient={patientData} />}
            </div>
            <div className={commonComponentContainerStyle}>
              <PatientBloodPressure systolic={120} diastolic={80} />
            </div>
            <div className={commonComponentContainerStyle}>
              <PatientTemperature initialTemperature={37.0} />
            </div>
            {/* Más componentes si los necesitas */}
            <div className={commonComponentContainerStyle}>
              <CameraComponent />
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
