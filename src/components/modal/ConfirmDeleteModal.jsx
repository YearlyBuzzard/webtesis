import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { TrashIcon, XIcon } from '@heroicons/react/outline';

function ConfirmDeleteModal({ open, onClose, onDelete }) {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className="bg-white p-4 rounded-lg w-80 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 id="modal-title" className="text-lg font-medium mb-4">
          ¿Estás seguro que deseas eliminar este dato?
        </h2>
        <p id="modal-description" className="text-gray-500 text-sm mb-4">
          Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end">
          <div className="mr-2">
            <button className="flex items-center justify-center border border-red-600 text-red-600 py-2 px-4 hover:bg-red-600 hover:text-white rounded-full transition-colors"
              onClick={handleDelete}
            >
              <TrashIcon className="h-6 w-6 mr-1" />
              Eliminar
            </button>
          </div>

          <div>
            <button className="flex items-center justify-center border border-blue-500 text-blue-500 py-2 px-4 hover:bg-blue-500 hover:text-white rounded-full transition-colors duration-200"
              onClick={onClose}
            >
              <XIcon className="h-6 w-6 mr-1"
              />
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDeleteModal;
