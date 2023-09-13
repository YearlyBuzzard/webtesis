import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon, SaveIcon } from '@heroicons/react/outline';
import PatientForm from '../DashboardComponents/PatientForm';

const EditPatientModal = ({ isModalOpen, closeModal, patient, onUpdate }) => {
  const [editedPatient, setEditedPatient] = useState(null);

  useEffect(() => {
    if (patient) {
      setEditedPatient(patient);
    }
  }, [patient]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setEditedPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    onUpdate(editedPatient);
  };

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
                <div className="text-lg font-medium">Edit Patient</div>
                <button className="p-1" onClick={closeModal}>
                  <XIcon className="h-6 w-6 text-gray-500" />
                </button>
              </div>
              <div className="px-6 py-4">
                {editedPatient && (
                  <PatientForm
                    patient={editedPatient}
                    onChange={handleFormChange}
                  />
                )}
              </div>
              <div className="px-6 py-4 flex justify-end">
                <button
                  className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600"
                  onClick={handleSaveChanges}
                >
                  <SaveIcon className="h-5 w-5 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditPatientModal;
