import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const UserMenu = ({ userName = 'Alejandro Sol' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const profileImages = [
    'https://via.placeholder.com/40',
    'https://via.placeholder.com/50',
    'https://via.placeholder.com/60',
    // Agrega aquí más URLs de imágenes
  ];

  const getRandomProfileImage = () => {
    const randomIndex = Math.floor(Math.random() * profileImages.length);
    return profileImages[randomIndex];
  };

  const userProfileImage = getRandomProfileImage();

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 font-bold text-black focus:outline-none"
      >
        <span>{userName}</span>
        <img src={userProfileImage} alt="Foto de perfil" className="w-8 h-8 rounded-full" />
      </button>
      {isOpen && (
        <ul className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl text-gray-700 z-50">
          <li>
            <Link to="/" className="block px-4 py-2 hover:bg-gray-200">
              Perfil
            </Link>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-200">
              Configuración
            </a>
          </li>
          <li>
            <Link to="/Dashboard" className="block px-4 py-2 hover:bg-gray-200">
              Panel de Control
            </Link>
          </li>
          <li>
            <a href="#logout" className="block px-4 py-2 hover:bg-gray-200">
              Cerrar sesión
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
