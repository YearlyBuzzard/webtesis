import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaClinicMedical } from 'react-icons/fa'; // Importa el icono médico

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 font-bold text-black focus:outline-none"
      >
        <FaClinicMedical className="text-lg" /> {/* Icono médico */}
        <span>Inicio</span> {/* Texto de inicio */}
      </button>
      {isOpen && (
        <ul className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl text-gray-700 z-50">
          <li>
            <Link to="/Dashboard" className="block px-4 py-2 hover:bg-gray-200">
              Panel de Control
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
