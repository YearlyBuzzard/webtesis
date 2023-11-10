import React from 'react';

function Switch(props) {
  // Estilos para el contenedor, el deslizador y el input
  const containerStyles = {
    position: 'relative',
    display: 'inline-block',
    width: '60px',
    height: '30px',
  };

  const sliderStyles = {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ccc', // --slider-color
    transition: '0.3s',
    borderRadius: '34px',
    // Nota: los estilos del pseudo-elemento se han omitido porque no son compatibles con los estilos en línea
  };

  const inputStyles = {
    opacity: 0,
    width: 0,
    height: 0,
    // Estos estilos de estado se manejarán de otra manera, ya que los estilos en línea no admiten pseudo-clases
  };

  // Manejador para cambiar el estilo del slider cuando el checkbox está marcado
  const handleChange = (e) => {
    if (e.target.checked) {
      sliderStyles.backgroundColor = '#3ecf8e'; // --slider-checked-color
      // Aquí podrías añadir lógicas adicionales para manipular otros estilos si es necesario
    } else {
      sliderStyles.backgroundColor = '#ccc'; // --slider-color
    }
  };

  return (
    <label style={containerStyles}>
      <input
        type="checkbox"
        {...props}
        style={inputStyles}
        onChange={handleChange} // Asegúrate de no sobrescribir el manipulador 'onChange' de props
      />
      <span style={sliderStyles}></span> {/* Esto representa el Slider */}
    </label>
  );
}

export default Switch;
