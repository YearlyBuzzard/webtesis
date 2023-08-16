import React, { useState, useEffect, useRef } from 'react';
import { FaThermometerHalf } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AreaChart,
  Area,
  YAxis,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { time: '1', value: 36.5 },
  { time: '2', value: 36.8 },
  { time: '3', value: 36.7 },
  { time: '4', value: 36.6 },
  { time: '5', value: 36.9 },
  { time: '6', value: 36.8 },
  { time: '7', value: 36.7 },
];

const PatientTemperature = ({ temperature }) => {
  const temperatureRef = useRef(temperature);
  const [notification, setNotification] = useState(null);
  const toastId = useRef(null);

  useEffect(() => {
    if (temperatureRef.current !== temperature) {
      temperatureRef.current = temperature;
      if (temperature < 35 || temperature > 38.3) {
        setNotification('danger');
      } else if (temperature < 36.1 || temperature > 37.2) {
        setNotification('warning');
      } else {
        setNotification('success');
      }
    }
  }, [temperature]);

  useEffect(() => {
    if (notification && !toast.isActive(toastId.current)) {
      if (notification === 'danger') {
        toastId.current = toast.error('La temperatura del paciente es anormalmente alta o baja.');
      } else if (notification === 'warning') {
        toastId.current = toast.warning('La temperatura del paciente está ligeramente fuera del rango normal.');
      } else if (notification === 'success') {
        toastId.current = toast.success('La temperatura del paciente está dentro del rango normal.');
      }
    }
  }, [notification]);

  let color = '';
  let barColor = '';
  if (temperature < 36 || temperature > 38) {
    color = 'text-red-500';
    barColor = 'bg-red-500';
  } else if (temperature < 36.5 || temperature > 37.5) {
    color = 'text-yellow-500';
    barColor = 'bg-yellow-500';
  } else {
    color = 'text-green-500';
    barColor = 'bg-green-500';
  }

  const chartData = [...data, { time: '8', value: temperature }];

  return (
    <div className="flex flex-col">
      <div className="bg-white p-5 rounded-xl">
        {<div className="text-center flex flex-col items-center">
          <h1 className="text-2xl font-bold text-black-800 mb-4">
            Temperatura del Paciente
            <FaThermometerHalf className="inline-block ml-2" />
          </h1>
          <div className={`text-6xl font-semibold ${color} mb-4`}>{temperature} °C</div>
          <div className="w-full h-4 rounded-lg overflow-hidden">
            <div className={`h-full ${barColor}`} style={{ width: `${(temperature - 35) * 20}%` }}></div>
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
              <YAxis hide domain={['auto', 'auto']} />
              <XAxis hide dataKey="time" />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </div>}
      </div>
    </div>
  );
};

export default PatientTemperature;