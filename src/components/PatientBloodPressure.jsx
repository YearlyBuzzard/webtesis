import React, { useState, useEffect } from 'react';
import { FaHeartbeat } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { LineChart, Line, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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

  return (
    <div className="flex flex-col">
      <div className="bg-white p-5 rounded-xl">
        <div className="text-center flex flex-col items-center">
          <h1 className="text-2xl font-bold text-black-800 mb-4">
            Presión Arterial del Paciente
            <FaHeartbeat className="inline-block ml-2 " />
          </h1>
          <div className="text-6xl font-semibold text-blue-800 mb-4">
            {systolic}/{diastolic} mmHg
          </div>
          <div className="w-full h-24">
            <ResponsiveContainer>
              <LineChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Line type="monotone" dataKey="value" stroke="#4B5563" strokeWidth={2} dot={false} />
                <YAxis type="number" domain={[60, 140]} hide={true} />
                <Tooltip contentStyle={{ backgroundColor: '#4B5563', border: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientBloodPressure;

