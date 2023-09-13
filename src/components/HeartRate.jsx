import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { GiHeartOrgan, GiHeartBeats } from 'react-icons/gi';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const HeartRate = ({ bpm }) => {
  const bpmRef = useRef(bpm);
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [heartRateData, setHeartRateData] = useState(generateHeartRateData());

  function generateHeartRateData(dataPoints = 12) {
    let data = [];
    for (let i = 1; i <= dataPoints; i++) {
      let value = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
      data.push({
        time: `${i}`,
        value: value
      });
    }
    return data;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRateData(generateHeartRateData());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    if (bpmRef.current !== bpm) {
      bpmRef.current = bpm;
      if (bpm < 60 || bpm > 100) {
        setNotification('danger');
      } else if (bpm < 70 || bpm > 90) {
        setNotification('warning');
      } else {
        setNotification('success');
      }
    }
  }, [bpm]);

  useEffect(() => {
    if (bpm < 60 || bpm > 100) {
        toast.error('El ritmo cardíaco del paciente es anormalmente alto o bajo.');
        setNotification('danger');
    } else if (bpm < 70 || bpm > 90) {
        toast.warning('El ritmo cardíaco del paciente está ligeramente fuera del rango normal.');
        setNotification('warning');
    } else {
        toast.success('El ritmo cardíaco del paciente está dentro del rango normal.');
        setNotification('success');
    }
}, [bpm]);


  let color = notification === 'danger' ? '#F87171' : notification === 'warning' ? '#FBBF24' : '#34D399';

  return (
    <div className="flex flex-col" onClick={handleShow}>
      <div className="p-6 rounded-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">
            Ritmo Cardíaco
            <GiHeartOrgan className="inline-block ml-2 text-red-500" />
          </h1>
          <div className="text-4xl font-semibold text-purple-800 mb-2" style={{color: color}}>
            {bpm} 
            <GiHeartBeats className="inline-block ml-2" size="1.5em" />
          </div>
          <p className="text-xl text-gray-600 mb-4">latidos/min</p>
          <div className="w-full h-[83px] mb-4">
            <ResponsiveContainer>
              <AreaChart data={heartRateData}>
                <XAxis dataKey="time" hide={true} />
                <YAxis hide={true} />
                <Tooltip />
                <Area type="monotone" dataKey="value" fill={color} strokeWidth={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" onClick={handleClose}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Gráfica detallada del ritmo cardíaco
                    </h3>
                  </div>
                </div>
                <div className="w-full h-[500px] mt-4">
                  <ResponsiveContainer>
                    <AreaChart data={heartRateData}>
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
                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleClose}>
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

export default HeartRate;
