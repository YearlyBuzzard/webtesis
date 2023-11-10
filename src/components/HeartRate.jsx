import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { GiHeartBeats } from 'react-icons/gi';
import { AreaChart, Area, YAxis, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const HeartRate = ({ initialBpm = 75 }) => {
  const [bpm, setBpm] = useState(initialBpm);
  const bpmRef = useRef(bpm);
  const [notification, setNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chartData, setChartData] = useState([]);

  // Simulación del cambio del ritmo cardíaco
  useEffect(() => {
    const interval = setInterval(() => {
      const newBpm = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
      setBpm(newBpm);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Actualización del gráfico con el nuevo valor de BPM
  useEffect(() => {
    setChartData(prevData => [...prevData.slice(-11), { time: new Date().toLocaleTimeString(), value: bpm }]);
  }, [bpm]);

  // Notificaciones de cambio de BPM
  useEffect(() => {
    if (bpmRef.current !== bpm) {
      bpmRef.current = bpm;
      if (bpm < 60 || bpm > 100) {
        setNotification('danger');
        toast.error('El ritmo cardíaco del paciente es anormalmente alto o bajo.');
      } else if (bpm <= 70 || bpm >= 90) {
        setNotification('warning');
        toast.warning('El ritmo cardíaco del paciente está ligeramente fuera del rango normal.');
      } else {
        setNotification('success');
        toast.success('El ritmo cardíaco del paciente está dentro del rango normal.');
      }
    }
  }, [bpm]);

  let color = '';
  let colorValue = '';
  if (bpm < 60 || bpm > 100) {
    color = 'text-red-500';
    colorValue = '#EF4444';
  } else if (bpm <= 70 || bpm >= 90) {
    color = 'text-yellow-500';
    colorValue = '#FBBF24';
  } else {
    color = 'text-green-500';
    colorValue = '#10B981';
  }

  const handleClose = () => setIsModalOpen(false);
  const handleShow = () => setIsModalOpen(true);

  return (
    <div className="flex flex-col w-full h-full"> {/* Asegúrate de que el componente principal ocupe todo el espacio disponible */}
      <div className="bg-white p-5 rounded-xl w-full" onClick={handleShow}> {/* Aquí también nos aseguramos de que el div ocupe todo el ancho */}
        <div className="text-center flex flex-col items-center w-full"> {/* Establece el ancho a todo el contenedor */}
          <h1 className="text-2xl font-bold text-blue-800 mb-4 w-full">Ritmo Cardíaco<GiHeartBeats className="inline-block ml-2" /></h1> {/* Estira el título para ocupar el ancho completo */}
          <div className={`text-6xl font-semibold ${color} mb-4`}>{bpm} BPM</div>
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
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Ritmo Cardíaco</h3>
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

export default HeartRate;