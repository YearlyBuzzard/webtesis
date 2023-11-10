import React from 'react';
import { AreaChart, Area, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, XAxis } from 'recharts';

const OxygenLevelChart = ({ data, colorValue, height }) => (
  <ResponsiveContainer width="100%" height={height || 100}>
    <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
      <Area type="monotone" dataKey="value" stroke="none" fill={colorValue} fillOpacity={0.2} />
      <YAxis hide domain={['auto', 'auto']} />
      <Tooltip />
      {height && <CartesianGrid strokeDasharray="3 3" />}
      {height && <XAxis dataKey="time" />}
      {height && <YAxis />}
    </AreaChart>
  </ResponsiveContainer>
);

export default OxygenLevelChart;
