import React from 'react';
import { Bell } from "react-feather";

// Definimos los estilos en línea como objetos en JavaScript
const wrapperStyles = {
  position: 'relative',
  display: 'inline-block',
  color: '#fff',
  cursor: 'pointer', // Se asume que siempre quieres el cursor como puntero
};

const spanStyles = {
  position: 'absolute',
  top: '-8px',
  right: '-8px',
  background: 'red',
  borderRadius: '4px',
  width: '22px',
  height: '22px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

// Nota: La tipificación de 'Props' se ha eliminado para compatibilidad con archivos .js
function Trigger({ count, onClick }) {
  return (
    <div style={wrapperStyles} onClick={onClick}>
      <Bell />
      <span style={spanStyles}>{count}</span>
    </div>
  );
}

export default Trigger;
