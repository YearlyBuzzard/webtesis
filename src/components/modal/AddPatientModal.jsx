import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import PatientForm from '../DashboardComponents/PatientForm';

const AddPatientModal = ({ isModalOpen, closeModal, onUpdate }) => {
  return (
    <Transition appear show={isModalOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-4">
                <div className="text-lg font-medium mb-2">
                  Agregar nuevo paciente
                </div>
                <PatientForm onUpdate={onUpdate} />
              </div>
              <div className="px-6 py-4 bg-gray-100">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddPatientModal;
