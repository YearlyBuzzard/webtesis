import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InformationCircleIcon, PencilIcon, TrashIcon, EyeIcon, SearchIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';
import { Chip, Card, CardHeader, Typography, Button, CardBody, IconButton, Tooltip, CardFooter, Input } from "@material-tailwind/react";
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal';
import AddPatientModal from '../modal/AddPatientModal';
import EditPatientModal from '../modal/EditPatientModal';
import { FiPlus } from 'react-icons/fi';

const TABLE_HEAD = ["Member", "Age", "Gender", "Status", "Condition", "Details", "Actions"];

const getStatusIcon = (status) => {
  switch (status) {
    case 'Stable':
      return { value: "Stable", color: "green" };
    case 'Serious':
      return { value: "Serious", color: "yellow" };
    case 'Critical':
      return { value: "Critical", color: "red" };
    default:
      return { value: "Unknown", color: "gray" };
  }
};

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [disabledPatients, setDisabledPatients] = useState([]);
  const [enabledPatients, setEnabledPatients] = useState([]);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [patientToDisable, setPatientToDisable] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // New state for active tab

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/patients');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchEnabledPatients = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/patients/enabled');
      const data = await response.json();
      setEnabledPatients(data);
    } catch (error) {
      console.error('Error fetching enabled patients:', error);
    }
  };

  const fetchDisabledPatients = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/patients/disabled');
      const data = await response.json();
      setDisabledPatients(data);
    } catch (error) {
      console.error('Error fetching disabled patients:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchEnabledPatients();
    fetchDisabledPatients();
  }, []);

  const handleOpenDeleteModal = (patientId) => {
    setPatientToDelete(patientId);
    setOpenDeleteModal(true);
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

  const disablePatient = async (patientId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/patients/${patientId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          disabled: true,
        }),
      });

      if (response.ok) {
        const updatedPatients = patients.map((patient) =>
          patient.id === patientId ? { ...patient, disabled: true } : patient
        );
        setPatients(updatedPatients);
        toast.success('Paciente deshabilitado correctamente', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error('Error al deshabilitar al paciente', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error('Error disabling patient:', error);
      toast.error('Error al deshabilitar al paciente', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleDisableClick = (patientId) => {
    setPatientToDisable(patientId);
    disablePatient(patientId);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openEditModal = (patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPatient(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleUpdatePatient = async (updatedPatient) => {
    try {
      const response = await fetch(`http://localhost:3001/api/patients/${updatedPatient.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPatient),
      });

      if (response.ok) {
        const updatedPatients = patients.map((patient) =>
          patient.id === updatedPatient.id ? updatedPatient : patient
        );
        setPatients(updatedPatients);
        toast.success('Paciente actualizado correctamente', {
          position: toast.POSITION.TOP_RIGHT,
        });
        closeEditModal();
      } else {
        toast.error('Error al actualizar paciente', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error('Error updating patient:', error);
      toast.error('Error al actualizar paciente', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // Filter patients based on active tab
  const filteredPatients = activeTab === 'all' ? patients : (activeTab === 'enabled' ? enabledPatients : disabledPatients);

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Lista de Pacientes
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Ver información sobre todos los pacientes
            </Typography>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <SearchIcon className="h-5 w-5 text-blue-gray-400" />
              <Input
                type="text"
                color="lightBlue"
                size="regular"
                outline={true}
                placeholder="Search patients"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button color="blue" size="sm" onClick={openAddModal}>
              <FiPlus className="inline mr-2" />
              Add Patient
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <div className="flex justify-between mb-4">
          <Button
            color={activeTab === 'all' ? 'blue' : 'gray'}
            onClick={() => setActiveTab('all')}
            size="sm"
            className={`w-1/3 ${activeTab === 'all' ? 'bg-blue-500' : 'bg-gray-200'}`}
          >
            <InformationCircleIcon className="h-4 w-4 inline mr-1" />
            Todos
          </Button>
          <Button
            color={activeTab === 'enabled' ? 'blue' : 'gray'}
            onClick={() => setActiveTab('enabled')}
            size="sm"
            className={`w-1/3 ${activeTab === 'enabled' ? 'bg-blue-500' : 'bg-gray-200'}`}
          >
            <EyeIcon className="h-4 w-4 inline mr-1" />
            Habilitados
          </Button>
          <Button
            color={activeTab === 'disabled' ? 'blue' : 'gray'}
            onClick={() => setActiveTab('disabled')}
            size="sm"
            className={`w-1/3 ${activeTab === 'disabled' ? 'bg-blue-500' : 'bg-gray-200'}`}
          >
            <TrashIcon className="h-4 w-4 inline mr-1" />
            Deshabilitados
          </Button>
        </div>
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, index) => {
              const status = getStatusIcon(patient.status);
              const classes = index === filteredPatients.length - 1 ? "p-4" : "p-4 border-b border-blue-gray-100";
              return (
                <tr key={patient.id} className={classes}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-blue-500 h-10 w-10 flex items-center justify-center">
                        <span className="font-medium text-sm text-white">{patient.name[0]}</span>
                      </div>
                      <span className="font-medium">{patient.name}</span>
                    </div>
                  </td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>
                    <Chip color={status.color} variant="solid" size="sm">
                      {status.value}
                    </Chip>
                  </td>
                  <td>{patient.condition}</td>
                  <td>
                    <IconButton className="p-1" color="lightBlue">
                      <Tooltip title="View Details">
                        <Link to="/content">
                          <InformationCircleIcon className="h-5 w-5 inline" />
                        </Link>
                      </Tooltip>
                    </IconButton>
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <IconButton color="blue" size="small" onClick={() => openEditModal(patient)}>
                        <PencilIcon strokeWidth={2} className="h-4 w-4" />
                      </IconButton>
                      <IconButton color="blue" size="small">
                        <EyeIcon strokeWidth={2} className="h-4 w-4" />
                      </IconButton>
                      <IconButton
                        color="red"
                        size="small"
                        onClick={() => handleOpenDeleteModal(patient.id)}
                      >
                        <TrashIcon strokeWidth={2} className="h-4 w-4" />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter>
        <div className="flex justify-between">
          <Typography color="gray">
            Mostrando {filteredPatients.length} de {patients.length} Pacientes
          </Typography>
          <div className="flex gap-2">
            <Button size="sm" color="blue-gray" variant="outlined">
              Previous
            </Button>
            <Button size="sm" color="blue-gray" variant="outlined">
              Next
            </Button>
          </div>
        </div>
      </CardFooter>
      <ConfirmDeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onDelete={deletePatient}
      />
      <AddPatientModal
        isModalOpen={isAddModalOpen}
        closeModal={closeAddModal}
        onUpdate={fetchPatients}
        
      />
      {selectedPatient && (
        <EditPatientModal
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          patient={selectedPatient}
          onUpdate={handleUpdatePatient}
        />
      )}
    </Card>
  );
};

export default PatientList;
