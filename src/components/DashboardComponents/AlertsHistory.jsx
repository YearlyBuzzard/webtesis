import React from 'react';

const AlertsHistory = ({ alerts }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-400 px-4 py-2">Paciente</th>
            <th className="border border-gray-400 px-4 py-2">Alerta</th>
            <th className="border border-gray-400 px-4 py-2">Hora</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map(alert => (
            <tr key={alert.id} className="hover:bg-gray-100">
              <td className="border border-gray-400 px-4 py-2">{alert.paciente}</td>
              <td className="border border-gray-400 px-4 py-2">{alert.descripcion}</td>
              <td className="border border-gray-400 px-4 py-2">{alert.hora}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertsHistory;
