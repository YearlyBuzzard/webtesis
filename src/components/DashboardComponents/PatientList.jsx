import React, { useState, useEffect } from 'react';
import { UserCircleIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal'


const getStatusIcon = (status) => {
  switch (status) {
    case 'Stable':
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    case 'Serious':
      return <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />;
    case 'Critical':
      return <XCircleIcon className="h-5 w-5 text-red-500" />;
    default:
      return null;
  }
};
const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  const colors = ['bg-green-100', 'bg-red-100', 'bg-yellow-100', 'bg-pink-100', 'bg-purple-100', 'bg-blue-100'];
  const getRandomColor = (index) => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const handleOpenDeleteModal = (patientId) => {
    setPatientToDelete(patientId);
    setShowDeleteModal(true);
  };

  const deletePatient = async () => {
    if (patientToDelete) {
      try {
        const response = await fetch(`http://localhost:3001/api/patients/${patientToDelete}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setPatients(patients.filter((patient) => patient.id !== patientToDelete));
          toast.success('Paciente eliminado correctamente', {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error('Error al eliminar paciente', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        console.error('Error deleting patient:', error);
        toast.error('Error al eliminar paciente', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      setOpenDeleteModal(false);
      setPatientToDelete(null);
    }
  };



  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/patients');
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    fetchPatients();
  }, []);
  return (
  <div className="bg-white p-6 rounded-xl">
  <h2 className="text-xl font-bold mb-2">Pacientes</h2>
  <div className="overflow-x-auto">
    <table className="table-auto border-collapse w-full">
      <thead>
        <tr>
          <th className="text-left px-4 py-2">Foto</th>
          <th className="text-left px-4 py-2">Nombre</th>
          <th className="text-left px-4 py-2">Edad</th>
          <th className="text-left px-4 py-2">Género</th>
          <th className="text-left px-4 py-2">Estado</th>
          <th className="text-left px-4 py-2">Condición</th>
          <th className="text-left px-4 py-2">Detalles</th>
          <th className="text-left px-4 py-2">Acciones</th>
        </tr>
      </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={patient.id} className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
              <td className="p-2">
                <div className={`w-12 h-12 flex items-center justify-center rounded-full ${getRandomColor(index)} text-black-500 font-semibold text-xl`}>
                  {patient.name.charAt(0).toUpperCase()}
                </div>
              </td>
              <td className="font-semibold p-2">{patient.name}</td>
              <td className="p-2">{patient.age}</td>
              <td className="p-2 flex itemsitems-center">
                <UserCircleIcon className={`h-5 w-5 mr-2 ${patient.gender === 'Male' ? 'text-blue-500' : 'text-pink-500'}`} />
                {patient.gender}
              </td>
              <td className="p-2">{patient.condition}</td>
              <td className="p-2 flex items-center">
                {getStatusIcon(patient.status)}
                <span className={`px-2 py-1 rounded-full text-sm font-bold ${patient.status === 'Stable' ? 'text-green-600 bg-green-100' : patient.status === 'Serious' ? 'text-yellow-600 bg-yellow-100' : 'text-red-600 bg-red-100'}`}>
                  {patient.status}
                </span>
              </td>
              <td className="p-2">
                <button className="border border-sky-600 text-sky-600 py-1 px-3 hover:bg-sky-600 hover:text-white rounded-xl transition-colors">
                  <Link to="/content">
                    <InformationCircleIcon className="h-5 w-5 inline" />
                  </Link>
                </button>
              </td>
              <td className="p-2 flex space-x-2">
                <button className="border border-green-600 text-green-600 py-1 px-3 hover:bg-green-600 hover:text-white rounded-xl transition-colors">
                  <PencilAltIcon className="h-5 w-5 inline" />
                </button>
                <button
                  className="border border-red-600 text-red-600 py-1 px-3 hover:bg-red-600 hover:text-white rounded-xl transition-colors"
                  onClick={() => {
                    setPatientToDelete(patient.id);
                    setOpenDeleteModal(true);
                  }}
                >
                  <TrashIcon className="h-5 w-5 inline" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
      </div>
      <ConfirmDeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onDelete={deletePatient}
      />
    </div>
    </div>
  );
};
export default PatientList;