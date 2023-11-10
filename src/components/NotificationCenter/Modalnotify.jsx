// Modal.js
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 0 20px;
  padding: 25px;
  max-width: 300px; // o el tamaño que prefieras para el modal
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const modalVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: "-50%" },
};

const Modal = ({ isOpen, children, onClose }) => {
  return (
    <Backdrop
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={modalVariants}
      transition={{ damping: 300 }}
      onClick={onClose}
      role="button"
      tabIndex={0}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </Backdrop>
  );
};

export default Modal;
