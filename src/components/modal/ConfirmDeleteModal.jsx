import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

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
      <div className="bg-white p-4 rounded-lg w-80">
        <h2 id="modal-title" className="text-lg font-medium mb-4">
          ¿Estás seguro que deseas eliminar este dato?
        </h2>
        <p id="modal-description" className="text-gray-500 text-sm mb-4">
          Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end">
          <Button variant="outlined" color="error" className="mr-4" onClick={handleDelete}>
            Eliminar
          </Button>
          <Button variant="outlined" color="primary" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDeleteModal;
