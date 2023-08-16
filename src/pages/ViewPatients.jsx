import React, { useState } from 'react';
import { Slider, PatientList } from '../components';
import AddPatientModal from '../components/modal/AddPatientModal';
import { FiPlus } from 'react-icons/fi';

function ViewPatients() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gradient-to-b from-blue-200 fulls-creen">
      <div className="h-screen w-screen flex overflow-x-hidden">
        <div className="fixed">
          <Slider />
        </div>

        <div className="ml-80 w-full h-screen overflow-y-auto">
          <div className="border border-gray-300 shadow-lg bg-white p-6 rounded-xl my-6 mx-6">
            {/* Botón para agregar un nuevo paciente */}
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-xl mb-4"
              onClick={openModal}
            >
              <FiPlus className="inline mr-2" />
              Agregar nuevo paciente
            </button>

            {/* Modal para agregar un nuevo paciente */}
            <AddPatientModal
              isModalOpen={isModalOpen}
              closeModal={closeModal}
            />

            <PatientList />
          </div>
        </div>
      </div>
    </div>

  );
};

export default ViewPatients;

