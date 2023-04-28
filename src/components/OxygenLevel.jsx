import React from 'react';
import { GiLungs } from 'react-icons/gi';
import { LineChart, Line, YAxis, Tooltip } from 'recharts';

const data = [
  { time: '1', value: 95 },
  { time: '2', value: 97 },
  { time: '3', value: 109 },
  { time: '4', value: 97 },
];

const OxygenLevel = ({ level }) => {
  return (
    <div className="flex flex-col">
      <div className="bg-white p-6 rounded-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">
            Oxigenación en Sangre
            <GiLungs className="inline-block ml-2 text-red-500" />
          </h1>
          <div className="text-6xl font-semibold text-purple-800 mb-2">{level}</div>
          <p className="text-xl text-gray-600 mb-4">%</p>
          <div className="w-full h-[100px]">
            <LineChart width={150} height={100} data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
              />
              <YAxis />
              <Tooltip />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OxygenLevel;
