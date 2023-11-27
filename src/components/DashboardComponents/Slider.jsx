import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdLocalHospital, MdFavorite, MdAssessment, MdNotificationsActive, MdSettings, MdExitToApp } from 'react-icons/md';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const Slider = () => {
  const navigate = useNavigate();
  const firstName = sessionStorage.getItem('userFirstName');
  const lastName = sessionStorage.getItem('userLastName');
  const fullName = `${firstName} ${lastName}`;
  const initial = firstName ? firstName[0] : '';
  const randomColor = getRandomColor();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div className="h-screen flex bg-gray-100">
      <aside className="bg-white w-80 shadow-md min-h-screen flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center p-6 border-b">
            <span className="flex items-center justify-center h-12 w-12 rounded-full text-white text-xl font-medium" 
                  style={{ backgroundColor: randomColor }}>
              {initial}
            </span>
            <div className="ml-4 text-lg font-semibold text-gray-900">{fullName}</div>
          </div>

          <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <Link to="/Dashboard" className="flex items-center gap-4 p-4 hover:bg-gray-100">
                <MdLocalHospital className="w-6 h-6" /><span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link to="/Pacientes" className="flex items-center gap-4 p-4 hover:bg-gray-100">
                <MdFavorite className="w-6 h-6" /><span>Pacientes</span>
              </Link>
            </li>
            <li>
              <Link to="/Alertas" className="flex items-center gap-4 p-4 hover:bg-gray-100">
                <MdNotificationsActive className="w-6 h-6" /><span>Alertas</span>
              </Link>
            </li>
            <li>
              <Link to="/Analiticas" className="flex items-center gap-4 p-4 hover:bg-gray-100">
                <MdAssessment className="w-6 h-6" /><span>Análiticas</span>
              </Link>
            </li>
            <li>
              <Link to="/Settings" className="flex items-center gap-4 p-4 hover:bg-gray-100">
                <MdSettings className="w-6 h-6" /><span>Ajustes</span>
              </Link>
            </li>
          </ul>
          </nav>
        </div>

        <div className="p-6 border-t">
          <button onClick={handleLogout} className="w-full flex items-center gap-4 text-gray-700 hover:text-blue-600">
            <MdExitToApp className="w-6 h-6" /><span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Slider;