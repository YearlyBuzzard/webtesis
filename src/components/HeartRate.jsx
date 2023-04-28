import React from 'react';
import { GiHeartOrgan } from 'react-icons/gi';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '1', value: 75 },
  { time: '2', value: 80 },
  { time: '3', value: 77 },
  { time: '4', value: 72 },
  { time: '5', value: 76 },
  { time: '6', value: 79 },
  { time: '7', value: 74 },
  { time: '7', value: 80 },
  { time: '7', value: 90 },
  { time: '7', value: 74 },
  { time: '7', value: 74 },
  { time: '7', value: 100 },
];

const HeartRate = ({ bpm }) => {
  return (
    <div className="flex flex-col">
      <div className="p-6 rounded-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">
            Ritmo Cardíaco
            <GiHeartOrgan className="inline-block ml-2 text-red-500" />
          </h1>
          <div className="text-6xl font-semibold text-purple-800 mb-2">{bpm}</div>
          <p className="text-xl text-gray-600 mb-4">latidos/min</p>
          <div className="w-full h-[83px] mb-4">
            <ResponsiveContainer>
              <LineChart data={data}>
                <XAxis dataKey="time" hide={true} />
                <YAxis hide={true} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#000" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeartRate;
