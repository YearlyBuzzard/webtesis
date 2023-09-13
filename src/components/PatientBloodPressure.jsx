import React, { useState, useEffect } from 'react';
import { FaHeartbeat } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AreaChart, Area, YAxis, Tooltip, CartesianGrid, XAxis, ResponsiveContainer } from 'recharts';
import 'react-toastify/dist/ReactToastify.css';

const data = [
  { time: '1', value: 80 },
  { time: '2', value: 85 },
  { time: '3', value: 90 },
  { time: '4', value: 92 },
  { time: '5', value: 95 },
  { time: '6', value: 100 },
  { time: '73', value: 10 },
  { time: '65', value: 110 },
];

const PatientBloodPressure = ({ systolic, diastolic }) => {
  const [notification, setNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    if (notification === 'danger') {
      toast.error('La presión arterial del paciente es anormalmente alta o baja.', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (notification === 'warning') {
      toast.warning('La presión arterial del paciente está ligeramente fuera del rango normal.', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (notification === 'success') {
      toast.success('La presión arterial del paciente está dentro del rango normal.', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }, [notification]);

  let color = '';
  if (notification === 'danger') {
    color = '#F87171';  // Red color
  } else if (notification === 'warning') {
    color = '#FBBF24';  // Yellow color
  } else {
    color = '#34D399';  // Green color
  }

  const handleClose = () => setIsModalOpen(false);
  const handleShow = () => setIsModalOpen(true);

  return (
    <div className="flex flex-col" onClick={handleShow}>
      <div className="bg-white p-5 rounded-xl shadow-md">
        <div className="text-center flex flex-col items-center">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">
            Presión Arterial del Paciente
            <FaHeartbeat className="inline-block ml-2" />
          </h1>
          <div className="text-6xl font-semibold mb-4" style={{color: color}}>
            {systolic}/{diastolic} mmHg
          </div>
          <div className="w-full h-24">
            <ResponsiveContainer>
              <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Area type="monotone" dataKey="value" stroke='none' fill={color} strokeWidth={2} dot={false} />
                <YAxis type="number" domain={[60, 140]} hide={true} />
                <Tooltip contentStyle={{ backgroundColor: '#4B5563', border: 0, color: '#fff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" onClick={handleClose}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Gráfica detallada de Presión Arterial
                    </h3>
                  </div>
                </div>
                <div className="w-full h-[500px] mt-4">
                  <ResponsiveContainer>
                    <AreaChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" fill={color} strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
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
