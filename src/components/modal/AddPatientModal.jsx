import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon, SaveIcon } from '@heroicons/react/outline';
import PatientForm from '../DashboardComponents/PatientForm';

const AddPatientModal = ({ isModalOpen, closeModal, patientDetails, onUpdate }) => {
  const isEditMode = !!patientDetails; // Verifica si hay detalles del paciente para determinar si está en modo de edición

  return (
    <Transition appear show={isModalOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
        onClickOutside={closeModal}
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="text-lg font-medium">
                  {isEditMode ? 'Editar paciente' : 'Nuevo Paciente'}
                </div>
                <button className="p-1" onClick={closeModal}>
                  <XIcon className="h-6 w-6 text-gray-500" />
                </button>
              </div>
              <div className="px-6 py-4">
                <PatientForm patientDetails={patientDetails} onUpdate={onUpdate} />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddPatientModal;
