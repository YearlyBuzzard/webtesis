import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdRemoveRedEye } from 'react-icons/md';

function PatientTable() {
  const [patients, setPatients] = useState([]);
  const maxPatientsToShow = 5;

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    try {
      const response = await fetch('http://localhost:3001/api/patients');
      const data = await response.json();
      setPatients(data.map(patient => ({
        ...patient,
        bgColor: getRandomColor()
      })));
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  }

  function getRandomColor() {
    const colorClasses = [
      'bg-red-300', 'bg-green-300', 'bg-blue-300', 
      'bg-yellow-300', 'bg-purple-300', 'bg-pink-300', 'bg-indigo-300'
    ];
    return colorClasses[Math.floor(Math.random() * colorClasses.length)];
  }

  function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('');
  }

  return (
    <div className="bg-gray-100 p-2 sm:p-3 md:p-4 mx-auto max-w-full rounded-lg shadow-lg">
      <h2 className="text-md sm:text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-800">Pacientes</h2>
      <div className="overflow-x-auto shadow-md">
        <table className="min-w-full text-center bg-white rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-1 md:py-2 px-2 md:px-3 text-sm md:text-base">Imagen</th>
              <th className="py-1 md:py-2 px-2 md:px-3 text-sm md:text-base">Nombre</th>
              <th className="py-1 md:py-2 px-2 md:px-3 text-sm md:text-base">Edad</th>
              <th className="py-1 md:py-2 px-2 md:px-3 text-sm md:text-base">Género</th>
              <th className="py-1 md:py-2 px-2 md:px-3 text-sm md:text-base">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {patients.slice(0, maxPatientsToShow).map((patient, index) => (
               <tr key={index} className="border-b">
               <td className="py-4 px-6">
                 <div className={`flex justify-center items-center rounded-full p-2 text-white text-lg ${patient.bgColor}`}>
                   {getInitials(patient.name)}
                 </div>
               </td>
               <td className="py-4 px-6">
                 <span className="text-gray-700 font-medium">
                   {`${patient.name} ${patient.paternalLastName} ${patient.maternalLastName}`}
                 </span>
               </td>
               <td className="py-4 px-6">
                 <span className="text-gray-700">{patient.age}</span>
               </td>
               <td className="py-4 px-6">
                 <span className="text-gray-700">{patient.gender}</span>
               </td>
               <td className="py-4 px-6">
                 <Link to={`/content/${patient.id}`} className="inline-flex justify-center items-center bg-blue-500 hover:bg-blue-600 rounded-full p-2 shadow-lg">
                   <MdRemoveRedEye className="text-white text-lg" />
                 </Link>
               </td>
             </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 md:mt-4 text-right">
        <Link to="/Pacientes" className="inline-block text-sm md:text-base text-blue-500 border border-blue-500 py-1 md:py-2 px-3 md:px-4 rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300">
          Ver todos los pacientes
        </Link>
      </div>
    </div>
  );
}

export default PatientTable;
