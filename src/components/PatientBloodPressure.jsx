import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { FaHeartbeat } from 'react-icons/fa';
import { AreaChart, Area, YAxis, XAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import 'react-toastify/dist/ReactToastify.css';

const PatientBloodPressure = () => {
  const [systolic, setSystolic] = useState(120);
  const [diastolic, setDiastolic] = useState(80);
  const [data, setData] = useState([]);
  const [notification, setNotification] = useState(null);
  const lastNotification = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBloodPressure = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/bloodPressure'); // Asegúrate de que esta URL sea correcta
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const bpData = await response.json();
        setSystolic(bpData.systolic);
        setDiastolic(bpData.diastolic);

        setData(prevData => [
          ...prevData.slice(-11),
          { time: new Date().toLocaleTimeString(), systolic: bpData.systolic, diastolic: bpData.diastolic },
        ]);
      } catch (error) {
        console.error('Error al obtener la presión arterial:', error);
        toast.error('Error al cargar datos de presión arterial');
      }
    };

    const intervalId = setInterval(fetchBloodPressure, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let statusMessage;
    if (systolic < 90 || systolic > 140 || diastolic < 60 || diastolic > 90) {
      statusMessage = 'Peligro';
    } else if ((systolic >= 90 && systolic <= 120) && (diastolic >= 60 && diastolic <= 80)) {
      statusMessage = 'Normal';
    }

    if (lastNotification.current !== statusMessage) {
      statusMessage === 'Peligro' 
        ? toast.error(`Peligro: La presión arterial del paciente es ${systolic}/${diastolic} mmHg, anormalmente alta o baja.`)
        : toast.success(`Normal: La presión arterial del paciente es ${systolic}/${diastolic} mmHg.`);
    }

    setNotification(statusMessage);
    lastNotification.current = statusMessage;
  }, [systolic, diastolic]);

  let color = '';
  let colorValue = '';
  if (notification === 'Peligro') {
    color = 'text-red-500';
    colorValue = '#EF4444';
  } else {
    color = 'text-green-500';
    colorValue = '#10B981';
  }

  const handleClose = () => setIsModalOpen(false);
  const handleShow = () => setIsModalOpen(true);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="bg-white p-5 rounded-xl w-full" onClick={handleShow}>
        <div className="text-center flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold text-blue-800 mb-4 w-full">Presión Arterial <FaHeartbeat className="inline-block ml-2" /></h1>
          <div className={`text-5xl font-semibold ${color} mb-4`}>{systolic}/{diastolic} mmHg</div>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Area type="monotone" dataKey="systolic" stroke="none" fill={colorValue} fillOpacity={0.2} />
              <YAxis hide domain={['auto', 'auto']} />
              <XAxis hide dataKey="time" />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" onClick={handleClose}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Gráfica detallada de Presión Arterial
                    </h3>
                    <ResponsiveContainer width="100%" height={500}>
                      <AreaChart data={data}>
                        <XAxis dataKey="time"/>
                        <YAxis label={{ value: 'mmHg', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                        <Area name="Sistólica" type="monotone" dataKey="systolic" stroke="blue" fill={colorValue} fillOpacity={0.6} />
                        <Area name="Diastólica" type="monotone" dataKey="diastolic" stroke="red" fill={colorValue} fillOpacity={0.5} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleClose}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientBloodPressure;
