import React, { useState, useEffect } from 'react';
import { BiBell, BiHeart, BiError } from 'react-icons/bi';
import { FiThermometer } from 'react-icons/fi';

const ListAlertsHistory = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 10; // Cambiado a 10 datos por página

  useEffect(() => {
    const fetchAlerts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3001/api/alerts_history?page=${page}&pageSize=${pageSize}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener la respuesta del servidor');
        }
        const data = await response.json();
        const formattedAlerts = data.map(alert => ({
          id: `ID: ${alert.id}`,
          type: determineAlertType(alert),
          patient: `Paciente ID: ${alert.patient_id}`,
          timestamp: new Date(alert.fecha_hora),
          details: [
            { label: "Ritmo cardíaco", value: `${alert.ritmo_cardiaco} BPM` },
            { label: "Oxigenación sangre", value: `${alert.oxigenacion_sangre}%` },
            { label: "Presión arterial sistólica", value: `${alert.presion_arterial_sistolica} mmHg` },
            { label: "Presión arterial diastólica", value: `${alert.presion_arterial_diastolica} mmHg` },
            { label: "Temperatura", value: `${alert.temperatura}°C` },
          ],
        }));
        setAlerts(formattedAlerts);
        setFilteredAlerts(formattedAlerts);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();
  }, [page]);

  useEffect(() => {
    setFilteredAlerts(
      alerts.filter(alert =>
        alert.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, alerts]);

  const determineAlertType = (alert) => {
    if (alert.ritmo_cardiaco > 100) {
      return 'Ritmo Cardiaco Anormal';
    } else if (alert.presion_arterial_sistolica > 140 || alert.presion_arterial_diastolica > 90) {
      return 'Presión Arterial Alta';
    } else if (alert.temperatura > 37.5) {
      return 'Temperatura Elevada';
    }
    return 'Alerta General';
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Presión Arterial Alta':
        return <BiHeart className="text-red-500 mr-2" />;
      case 'Ritmo Cardiaco Anormal':
        return <BiError className="text-yellow-500 mr-2" />;
      case 'Temperatura Elevada':
        return <FiThermometer className="text-blue-500 mr-2" />;
      default:
        return <BiBell className="text-gray-500 mr-2" />;
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-lg">
      {/* Barra de búsqueda y paginación */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Buscar alertas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        {/* Controles de paginación */}
        <div className="flex">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Anterior
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setPage(prev => prev + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* Tabla */}
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className='px-4 py-2 border'>ID</th>
            <th className="px-4 py-2 border">Tipo</th>
            <th className="px-4 py-2 border">Paciente</th>
            <th className="px-4 py-2 border">Fecha</th>
            <th className="px-4 py-2 border">Detalles</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlerts.map((alert, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{alert.id}</td>
              <td className="border px-4 py-2">{getIcon(alert.type)} {alert.type}</td>
              <td className="border px-4 py-2">{alert.patient}</td>
              <td className="border px-4 py-2">{alert.timestamp.toLocaleDateString()} - {alert.timestamp.toLocaleTimeString()}</td>
              <td className="border px-4 py-2">
                {alert.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="text-gray-600">
                    <span className="font-semibold text-gray-800">{detail.label}:</span> <span className="text-orange-500">{detail.value}</span>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación en la parte superior */}
      <div className="flex justify-center mt-4">
        {/* Botones de paginación */}
      </div>
    </div>
  );
};

export default ListAlertsHistory;
