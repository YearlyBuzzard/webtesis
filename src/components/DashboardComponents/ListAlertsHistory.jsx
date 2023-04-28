import React from "react";
  import { BiBell, BiHeart, BiError } from "react-icons/bi";
  import { FiThermometer } from "react-icons/fi";

const ListAlertsHistory = () => {
  const alerts = [
    {
      type: "Presión Arterial Alta",
      patient: "Juan Pérez",
      timestamp: new Date("2023-04-20T10:30:00"),
      details: [
        { label: "Presión arterial", value: "160/100 mmHg" },
        { label: "Frecuencia cardiaca", value: "85 BPM" },
        { label: "Nivel de glucosa", value: "95 mg/dL" },
      ],
    },
    {
      type: "Ritmo Cardiaco Anormal",
      patient: "María González",
      timestamp: new Date("2023-04-20T09:15:00"),
      details: [
        { label: "Ritmo cardiaco", value: "110 BPM" },
        { label: "Presión arterial", value: "120/80 mmHg" },
        { label: "Nivel de glucosa", value: "90 mg/dL" },
      ],
    },
    {
      type: "Temperatura Elevada",
      patient: "Roberto Rodríguez",
      timestamp: new Date("2023-04-20T08:45:00"),
      details: [
        { label: "Temperatura", value: "38.5°C" },
        { label: "Frecuencia respiratoria", value: "18 respiraciones/min" },
        { label: "Nivel de glucosa", value: "100 mg/dL" },
      ],
    },
  ];

  
  
  const getIcon = (type) => {
    switch (type) {
      case "Presión Arterial Alta":
        return <BiHeart className="text-red-500 mr-2" />;
      case "Ritmo Cardiaco Anormal":
        return <BiError className="text-yellow-500 mr-2" />;
      case "Temperatura Elevada":
        return <FiThermometer className="text-blue-500 mr-2" />;
      default:
        return <BiBell className="text-gray-500 mr-2" />;
    }
  };
  
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center mb-4">
        <BiBell className="text-3xl text-red-500 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Historial de Alertas</h2>
      </div>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className="border border-gray-200 rounded-lg px-4 py-2">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                {getIcon(alert.type)}
                <h3 className="text-lg font-bold text-gray-800 ml-2">{alert.type}</h3>
              </div>
              <span className="text-sm text-gray-500">
                {alert.timestamp.toLocaleDateString()} - {alert.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <p className="text-sm font-bold text-gray-500 mb-2">Paciente: {alert.patient}</p>
            <div className="grid grid-cols-3 gap-4">
            {alert.details.map((detail, detailIndex) => (
                <div key={detailIndex} className="text-sm text-gray-600">
                  <span className="font-semibold">{detail.label}:</span> {detail.value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAlertsHistory;
