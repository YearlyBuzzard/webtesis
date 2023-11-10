import React from 'react';

// Definiendo los estilos en un objeto. Ten en cuenta que los keyframes no se pueden hacer con estilos en línea.
const styles = {
  circle: {
    position: 'relative',
    width: '15px',
    height: '15px',
    backgroundColor: '#3498db',
    borderRadius: '50%',
  },
  ring: {
    border: '3px solid #3498db',
    borderRadius: '30px',
    height: '30px',
    width: '30px',
    position: 'absolute',
    top: 'calc(-50% - 3px)',
    left: 'calc(-50% - 3px)',
    // No es posible definir 'animation' o 'keyframes' aquí en los estilos en línea
    // Necesitarías una hoja de estilos CSS separada o usar una biblioteca que permita definir keyframes
  },
};

function PulsatingDot() {
  // Inserta estilos en línea en lugar de clases
  return (
    <div style={styles.circle}>
      <div style={styles.ring} />
    </div>
  );
}

export default PulsatingDot;
