import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { GiLungs } from 'react-icons/gi';
import { LineChart, Line, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '1', value: 95 },
  { time: '2', value: 97 },
  { time: '3', value: 109 },
  { time: '4', value: 97 },
];

const OxygenLevel = ({ level }) => {
  const toastIdRef = useRef({ success: null, warning: null, error: null });
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      if (level < 90) {
        if (!toast.isActive(toastIdRef.current.error)) {
          toastIdRef.current.error = toast.error('La oxigenación en sangre del paciente es peligrosamente baja. Por favor, llame a un médico de inmediato.', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } else if (level < 95) {
        if (!toast.isActive(toastIdRef.current.warning)) {
          toastIdRef.current.warning = toast.warning('La oxigenación en sangre del paciente está por debajo del rango normal.', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } else {
        if (!toast.isActive(toastIdRef.current.success)) {
          toastIdRef.current.success = toast.success('La oxigenación en sangre del paciente está dentro del rango normal.');
        }
      }
    }
  }, [level]);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white p-6 rounded-xl h-full flex flex-col justify-center items-center">
        <div className="flex items-center mb-4">
          <GiLungs className="text-red-500 mr-2" />
          <h1 className="text-2xl font-bold text-black">Oxigenación en Sangre</h1>
        </div>
        <div className="text-4xl sm:text-6xl font-semibold text-blue-700 mb-2">{level}</div>
        <p className="text-xl text-gray-600 mb-4">%</p>
        <div className="w-full h-full">
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Line type="monotone" dataKey="value" stroke="#4B5563" strokeWidth={2} dot={false} />
              <YAxis type="number" domain={[0, 110]} hide={true} />
              <Tooltip contentStyle={{ backgroundColor: '#4B5563', border: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OxygenLevel;
