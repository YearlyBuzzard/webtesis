import React from "react";
import { BiBell } from "react-icons/bi";

const AlertHistory = () => {
    return (
        <div className="bg-white rounded-lg p-4">
            <div className="flex items-center mb-4">
                <BiBell className="text-3xl text-red-500 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">Historial de Alertas</h2>
            </div>
            <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg px-4 py-2">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Alerta de Presión Arterial Alta</h3>
                    <p className="text-sm font-bold text-gray-500">Paciente: Juan Pérez</p>
                    <p className="text-sm text-gray-500">10:30am</p>
                </div>
                <div className="border border-gray-200 rounded-lg px-4 py-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Alerta de Ritmo Cardiaco Anormal</h3>
                    <p className="text-sm text-gray-500">Paciente: María González</p>
                    <p className="text-sm text-gray-500">9:15am</p>
                </div>
                <div className="border border-gray-200 rounded-lg px-4 py-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Alerta de Temperatura Elevada</h3>
                    <p className="text-sm text-gray-500">Paciente: Roberto Rodríguez</p>
                    <p className="text-sm text-gray-500">8:45am</p>
                </div>
            </div>
            <div className="mt-4 flex justify-end">
            <button className="border border-sky-600 text-sky-600 py-2 px-4 hover:bg-sky-600 hover:text-white rounded-full transition-colors">
                    Ver todas las alertas
                </button>
            </div>
        </div>
    );
};

export default AlertHistory;
