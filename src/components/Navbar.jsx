import React from 'react';
import { Link } from 'react-router-dom';
import { FaStethoscope, FaExpandArrowsAlt } from 'react-icons/fa';
import Clock from './Clock';
import NotificationCenter from "./NotificationCenter/NotificationCenter";

const Navbar = ({ userName }) => {
  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="flex justify-between items-center bg-transparent p-4 backdrop-blur-md z-50">
      <div className="flex items-center space-x-4">
      <div className="hidden md:flex items-center">
          <Clock />
        </div>
        {/* Enlace con icono médico para el Panel de Control */}
      </div>

      <div className="flex items-center space-x-4">
        {/* Botón de Pantalla Completa */}
        <Link to="/Dashboard" className="flex items-center font-bold text-black focus:outline-none">
          <FaStethoscope className="text-lg mr-2 text-blue-600" />
          <span className="hidden md:inline">Inicio</span>
        </Link>
        <button onClick={handleFullScreen} className="focus:outline-none">
          <FaExpandArrowsAlt className="text-lg text-blue-600" />
        </button>
        <NotificationCenter />
      </div>
    </div>
  );
};

export default Navbar;
