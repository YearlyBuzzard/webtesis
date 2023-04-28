import React from 'react';
import ErrorAlert from './alerts/ErrorAlert';
import WarningAlert from './alerts/WarningAlert';
import SuccessAlert from './alerts/SuccessAlert';
import { FaHeartbeat } from 'react-icons/fa';

const PatientBloodPressure = ({ systolic, diastolic }) => {
  const renderAlert = () => {
    if (systolic < 90 || systolic > 140 || diastolic < 60 || diastolic > 90) {
      return <ErrorAlert message="La presión arterial del paciente es anormalmente alta o baja." />;
    } else if (
      (systolic >= 90 && systolic <= 120) &&
      (diastolic >= 60 && diastolic <= 80)
    ) {
      return <SuccessAlert message="La presión arterial del paciente está dentro del rango normal." />;
    } else {
      return <WarningAlert message="La presión arterial del paciente está ligeramente fuera del rango normal." />;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="bg-white p-5 rounded-xl">
        <div className="text-center flex flex-col items-center">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">
            Presión Arterial del Paciente
            <FaHeartbeat className="inline-block ml-2"/>
          </h1>
          <div className="text-6xl font-semibold text-blue-800 mb-4">
            {systolic}/{diastolic} mmHg
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 flex flex-col-reverse">
        {renderAlert()}
      </div>
    </div>
  );
};

export default PatientBloodPressure;
