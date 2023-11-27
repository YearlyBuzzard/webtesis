import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { FaThermometerHalf } from 'react-icons/fa';
import { AreaChart, Area, YAxis, XAxis, Tooltip, ResponsiveContainer, Label } from 'recharts';

const PatientTemperature = ({ initialTemperature = 36.5, patientId }) => {
  const [temperature, setTemperature] = useState(initialTemperature);
  const [chartData, setChartData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastNotification = useRef(null);

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/temperature');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTemperature(data.temperature);
      } catch (error) {
        console.error('Error al obtener la temperatura:', error);
        toast.error('Error al cargar datos de temperatura');
      }
    };

    const intervalId = setInterval(fetchTemperature, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let statusMessage = `Normal: ${temperature.toFixed(1)} °C`;
    if (temperature < 35.0 || temperature > 38.9) {
      statusMessage = `Peligro: ${temperature.toFixed(1)} °C`;
    } else if (temperature <= 36.0 || temperature >= 37.3) {
      statusMessage = `Precaución: ${temperature.toFixed(1)} °C`;
    }

    setChartData(prevData => [...prevData.slice(-11), {
      time: new Date().toLocaleTimeString(),
      value: temperature,
      range: statusMessage
    }]);

    if (statusMessage.startsWith('Peligro') && lastNotification.current !== 'Peligro') {
      toast.error(`Peligro: La temperatura del paciente es ${temperature.toFixed(1)} °C, anormalmente alta o baja.`);
      lastNotification.current = 'Peligro';
    } else if (statusMessage.startsWith('Normal') && lastNotification.current !== 'Normal') {
      toast.success(`Normal: La temperatura del paciente es ${temperature.toFixed(1)} °C.`);
      lastNotification.current = 'Normal';
    }

    // Guardar datos en la base de datos
    saveTemperatureData({ patient_id: patientId, temperatura: temperature });
  }, [temperature, patientId]);

  // Función para guardar datos de temperatura
  const saveTemperatureData = async (data) => {
    try {
      const response = await fetch('http://localhost:3001/api/vital_signs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }
      console.log('Datos de temperatura guardados con éxito');
    } catch (error) {
      console.error('Error al guardar la temperatura:', error);
      toast.error('Error al guardar datos de temperatura: ' + error.message);
    }
  };

  let color = '';
  let colorValue = '';
  if (temperature < 35.0 || temperature > 38.9) {
    color = 'text-red-500';
    colorValue = '#EF4444';
  } else if (temperature >= 36.0 && temperature <= 37.3) {
    color = 'text-green-500';
    colorValue = '#10B981';
  } else {
    color = 'text-yellow-500';
    colorValue = '#FBBF24';
  }

  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);

  return (
    <div className="flex flex-col w-full">
      <div className="bg-white p-5 rounded-xl w-full" onClick={handleOpenModal}>
        <div className="text-center flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">
            Temperatura del Paciente <FaThermometerHalf className="inline-block ml-2" />
          </h1>
          <div className={`text-5xl font-semibold ${color} mb-4`}>
            {temperature.toFixed(1)} °C
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
        <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" onClick={handleCloseModal}>
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
            <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Temperatura del Paciente</h3>
                    <div className="w-full h-[500px] mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <XAxis dataKey="time" />
                          <YAxis>
                            <Label value="Temperatura (°C)" angle={-90} position="insideLeft" />
                          </YAxis>
                          <Tooltip formatter={(value, name, props) => [props.payload.range, 'Estado']} />
                          <Area type="monotone" dataKey="value" fill={colorValue} stroke={colorValue} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleCloseModal}>
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientTemperature;
