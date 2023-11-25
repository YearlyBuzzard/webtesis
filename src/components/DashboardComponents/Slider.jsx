import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocalHospital, MdFavorite, MdAssessment, MdNotificationsActive, MdSettings } from 'react-icons/md';

// Función para generar un color aleatorio en formato hexadecimal
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const Slider = () => {
  const firstName = sessionStorage.getItem('userFirstName');
  const lastName = sessionStorage.getItem('userLastName');
  const fullName = `${firstName} ${lastName}`;
  const initial = firstName ? firstName[0] : ''; // Obtiene la primera letra del nombre
  const randomColor = getRandomColor(); // Genera un color aleatorio

  return (
    <div className="h-screen flex justify-center items-center">
      <aside className="bg-light-blue-100 min-h-full w-80 p-6 shadow-md rounded-3xl">
        <div className="flex items-center gap-3 mb-12">
          <span className="w-12 h-12 rounded-full flex justify-center items-center" 
                style={{ backgroundColor: randomColor, color: 'white', fontSize: '24px' }}>
            {initial}
          </span>
          <div className="text-lg font-semibold text-gray-900">{fullName}</div>
        </div>

        <nav>
          <ul className="space-y-4">
            <li>
              <Link to="/Dashboard" className="flex items-center gap-4 text-gray-800 hover:text-blue-700">
                <MdLocalHospital className="w-8 h-8" /><span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link to="/Pacientes" className="flex items-center gap-4 text-gray-800 hover:text-blue-700">
                <MdFavorite className="w-8 h-8" /><span>Pacientes</span>
              </Link>
            </li>
            <li>
              <Link to="/Alertas" className="flex items-center gap-4 text-gray-800 hover:text-blue-700">
                <MdNotificationsActive className="w-8 h-8" /><span>Alertas</span>
              </Link>
            </li>
            <li>
              <Link to="/Analiticas" className="flex items-center gap-4 text-gray-800 hover:text-blue-700">
                <MdAssessment className="w-8 h-8" /><span>Análiticas</span>
              </Link>
            </li>
            <li>
              <Link to="/Settings" className="flex items-center gap-4 text-gray-800 hover:text-blue-700">
                <MdSettings className="w-8 h-8" /><span>Ajustes</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Slider;
