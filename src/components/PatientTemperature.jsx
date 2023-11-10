import React, { useState, useEffect, useRef } from 'react';
import { FaThermometerHalf } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AreaChart, Area, YAxis, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PatientTemperature = ({ initialTemperature = 36.5 }) => {
  const [temperature, setTemperature] = useState(initialTemperature);
  const temperatureRef = useRef(temperature);
  const [notification, setNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const simulateTemperature = setInterval(() => {
      const randomTemp = (Math.random() * (38.5 - 35) + 35).toFixed(1);
      setTemperature(parseFloat(randomTemp));
    }, 5000);

    return () => clearInterval(simulateTemperature);
  }, []);

  useEffect(() => {
    setChartData(prevData => [...prevData.slice(-11), { time: new Date().toLocaleTimeString(), value: temperature }]);
  }, [temperature]);

  useEffect(() => {
    if (temperatureRef.current !== temperature) {
      temperatureRef.current = temperature;
      if (temperature < 35.0 || temperature > 38.9) {
        setNotification('danger');
      } else if (temperature <= 36.0 || temperature >= 37.3) {
        setNotification('warning');
      } else {
        setNotification('success');
      }
    }
  }, [temperature]);

  useEffect(() => {
    if (notification) {
      if (notification === 'danger') {
        toast.error('La temperatura del paciente es anormalmente alta o baja.');
      } else if (notification === 'warning') {
        toast.warning('La temperatura del paciente está ligeramente fuera del rango normal.');
      } else if (notification === 'success') {
        toast.success('La temperatura del paciente está dentro del rango normal.');
      }
    }
  }, [notification]);

  let color = '';
  let colorValue = '';
  if (temperature < 35.0 || temperature > 38.9) {
    color = 'text-red-500';
    colorValue = '#EF4444';
  } else if (temperature <= 36.0 || temperature >= 37.3) {
    color = 'text-yellow-500';
    colorValue = '#FBBF24';
  } else {
    color = 'text-green-500';
    colorValue = '#10B981';
  }

  const handleClose = () => setIsModalOpen(false);
  const handleShow = () => setIsModalOpen(true);

  return (
    <div className="flex flex-col w-full"> {/* Asegúrese de que el contenedor principal esté extendido completamente */}
      <div className="bg-white p-5 rounded-xl w-full" onClick={handleShow}> {/* Aquí también, asegúrese de que este div ocupe todo el ancho disponible */}
        <div className="text-center flex flex-col items-center w-full"> {/* El contenedor debe tener 'w-full' para ocupar todo el espacio horizontal disponible */}
          <h1 className="text-2xl font-bold text-blue-800 mb-4">Temperatura del Paciente<FaThermometerHalf className="inline-block ml-2" /></h1>
          <div className={`text-5xl font-semibold ${color} mb-4`}>{temperature} °C</div>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Area type="monotone" dataKey="value" stroke="none" fill={colorValue} fillOpacity={0.2} />
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
            
            {/* Aseguramos que el modal no aparezca estrecho, ajustando las clases para un ancho máximo más amplio */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full" onClick={(e) => e.stopPropagation()}>
              
              {/* Contenido del modal */}
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Temperatura del Paciente</h3>
                  </div>
                </div>
                {/* Contenedor para la gráfica, asegurando que es tan ancho como el modal */}
                <div className="w-full h-[500px] mt-4">
                  <ResponsiveContainer>
                    <AreaChart data={chartData}>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" fill={colorValue} stroke={colorValue} />
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

export default PatientTemperature;
