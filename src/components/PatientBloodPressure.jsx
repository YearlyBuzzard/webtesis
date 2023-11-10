import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { FaHeartbeat } from 'react-icons/fa';
import { AreaChart, Area, YAxis, Tooltip, XAxis, ResponsiveContainer, Legend, LabelList } from 'recharts';
import 'react-toastify/dist/ReactToastify.css';

const PatientBloodPressure = () => {
  const [systolic, setSystolic] = useState(120);
  const [diastolic, setDiastolic] = useState(80);
  const [data, setData] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newSystolic = Math.floor(Math.random() * (140 - 90 + 1) + 90);
      const newDiastolic = Math.floor(Math.random() * (90 - 60 + 1) + 60);
      setSystolic(newSystolic);
      setDiastolic(newDiastolic);
      setData((prevData) => [
        ...prevData.slice(-11), // Mantener solo los últimos 11 registros para la gráfica
        { time: new Date().toLocaleTimeString(), systolic: newSystolic, diastolic: newDiastolic },
      ]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (systolic < 90 || systolic > 140 || diastolic < 60 || diastolic > 90) {
      setNotification('danger');
    } else if ((systolic >= 90 && systolic <= 120) && (diastolic >= 60 && diastolic <= 80)) {
      setNotification('success');
    } else {
      setNotification('warning');
    }
  }, [systolic, diastolic]);

  useEffect(() => {
    if (notification) {
      if (notification === 'danger') {
        toast.error('La presión arterial del paciente es anormalmente alta o baja.');
      } else if (notification === 'warning') {
        toast.warning('La presión arterial del paciente está ligeramente fuera del rango normal.');
      } else if (notification === 'success') {
        toast.success('La presión arterial del paciente está dentro del rango normal.');
      }
    }
  }, [notification]);

  let color = '';
  let colorValue = '';
  if (notification === 'danger') {
    color = 'text-red-500';
    colorValue = '#EF4444'; // red
  } else if (notification === 'warning') {
    color = 'text-yellow-500';
    colorValue = '#FBBF24'; // yellow
  } else {
    color = 'text-green-500';
    colorValue = '#10B981'; // green
  }

  const handleClose = () => setIsModalOpen(false);
  const handleShow = () => setIsModalOpen(true);

  return (
    <div className="flex flex-col w-full h-full"> {/* Asegúrate de que el componente principal ocupe todo el espacio disponible */}
      <div className="bg-white p-5 rounded-xl w-full" onClick={handleShow}> {/* Aquí también nos aseguramos de que el div ocupe todo el ancho */}
        <div className="text-center flex flex-col items-center w-full"> {/* Establece el ancho a todo el contenedor */}
          <h1 className="text-2xl font-bold text-blue-800 mb-4 w-full">Presión Arterial<FaHeartbeat className="inline-block ml-2" /></h1> {/* Estira el título para ocupar el ancho completo */}
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
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                        <Area name="Systolic" type="monotone" dataKey="systolic" stroke="blue" fill={colorValue} fillOpacity={0.6}>
                          <LabelList dataKey="systolic" position="top" offset={4} />
                        </Area>
                        <Area name="Diastolic" type="monotone" dataKey="diastolic" stroke="red" fill={colorValue} fillOpacity={0.5}>
                          <LabelList dataKey="diastolic" position="bottom" offset={4} />
                        </Area>
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
