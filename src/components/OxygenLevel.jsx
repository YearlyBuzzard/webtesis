import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { FaTint } from 'react-icons/fa';
import { AreaChart, Area, YAxis, XAxis, Tooltip, ResponsiveContainer, Label } from 'recharts';

const OxygenLevel = ({ initialOxygenLevel = 95 }) => {
  const [oxygenLevel, setOxygenLevel] = useState(initialOxygenLevel);
  const [oxygenLevelStatus, setOxygenLevelStatus] = useState('Normal');
  const [chartData, setChartData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastNotification = useRef(null); // Ref para rastrear la última notificación

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulando la obtención de un nuevo nivel de oxígeno
      const newOxygenLevel = Math.floor(Math.random() * (110 - 85 + 1) + 85);
      setOxygenLevel(newOxygenLevel);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let statusMessage = `Normal: ${oxygenLevel}%`;
    if (oxygenLevel < 90) {
      statusMessage = `Peligro: ${oxygenLevel}%`;
    } else if (oxygenLevel < 95) {
      statusMessage = `Precaución: ${oxygenLevel}%`;
    }

    setOxygenLevelStatus(statusMessage);

    setChartData(prevData => [...prevData.slice(-11), { 
      time: new Date().toLocaleTimeString(), 
      value: oxygenLevel, 
      range: statusMessage 
    }]);

    if (statusMessage.startsWith('Peligro') && lastNotification.current !== 'Peligro') {
      toast.error(`Peligro: El nivel de oxígeno en sangre es ${oxygenLevel}%, anormalmente bajo.`);
      lastNotification.current = 'Peligro';
    } else if (statusMessage.startsWith('Normal') && lastNotification.current !== 'Normal') {
      toast.success(`Normal: El nivel de oxígeno en sangre es ${oxygenLevel}%.`);
      lastNotification.current = 'Normal';
    }
  }, [oxygenLevel]);

  let color = '';
  let colorValue = '';
  if (oxygenLevel < 90) {
    color = 'text-red-500';
    colorValue = '#EF4444';
  } else if (oxygenLevel < 95) {
    color = 'text-yellow-500';
    colorValue = '#FBBF24';
  } else {
    color = 'text-green-500';
    colorValue = '#10B981';
  }

  const handleClose = () => setIsModalOpen(false);
  const handleShow = () => setIsModalOpen(true);

  return (
    <div className="flex flex-col w-full">
      <div className="bg-white p-5 rounded-xl w-full" onClick={handleShow}>
        <div className="text-center flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">
            Nivel de Oxígeno en Sangre <FaTint className="inline-block ml-2" />
          </h1>
          <div className={`text-5xl font-semibold ${color} mb-4`}>
            {oxygenLevel}% 
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Area type="monotone" dataKey="value" stroke="none" fill={colorValue} fillOpacity={0.2} />
              <YAxis hide domain={['auto', 'auto']} />
              <XAxis hide dataKey="time" />
              <Tooltip formatter={(value, name, props) => [props.payload.range, 'Estado']} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" onClick={handleClose}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Nivel de Oxígeno en Sangre</h3>
                  </div>
                </div>
                <div className="w-full h-[500px] mt-4">
                  <ResponsiveContainer>
                    <AreaChart data={chartData}>
                      <XAxis dataKey="time" />
                      <YAxis>
                        <Label value="Oxígeno (%)" angle={-90} position="insideLeft" />
                      </YAxis>
                      <Tooltip formatter={(value, name, props) => [props.payload.range, 'Estado']} />
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

export default OxygenLevel;
