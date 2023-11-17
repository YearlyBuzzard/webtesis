import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaCalendar, FaPlus, FaBell, FaUserMd } from 'react-icons/fa';

const Slider = ({firstName, lastName}) => {
  const initials = `${firstName ? firstName[0] : ''}${lastName ? lastName[0] : ''}`;

  return (
    <div className="h-screen flex items-center">
      <aside className="flex flex-col justify-between gap-8 bg-gray-100 min-h-full max-h-full w-full sm:w-80 p-4 overflow-y-hidden shadow-md z-10 m-4 rounded-lg mx-auto">
        <section>
          <div className="logo flex items-center gap-4 mb-8">
            <img src="/logo-white.png" className="w-10 h-10 bg-indigo-600 p-2 rounded-xl" alt="Logo" />
            <div>
              <h3 className="font-bold text-indigo-600">Dashboard</h3>
              <p className="text-gray-800 text-xs">Hospital</p>
            </div>
          </div>
          <ul className="mt-4 mb-8">
            <li>
              <Link to="/Dashboard" className="flex items-center gap-4 p-2 hover:bg-gray-200 transition-colors rounded-lg">
                <FaHome className="w-5 h-5" />
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link to="/Pacientes" className="flex items-center gap-4 p-2 hover:bg-gray-200 transition-colors rounded-lg">
                <FaUser className="w-5 h-5" />
                <span>Pacientes</span>
              </Link>
            </li>
            <li>
              <Link to="/Alertas" className="flex items-center gap-4 p-2 hover:bg-gray-200 transition-colors rounded-lg">
                <FaUser className="w-5 h-5" />
                <span>Historial Alertas</span>
              </Link>
            </li>
          </ul>
        </section>
        <section>
          <ul className="my-4">
            <li>
              <a href="#" className="flex items-center gap-4 p-2 text-gray-500 hover:bg-gray-200 transition-colors rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Ajustes</span>
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-8 pt-4 border-t">
            <img src="https://img.freepik.com/fotos-premium/retrato-viejo-mexicano-sombrero_379858-2229.jpg" className="w-10 h-10 object-cover rounded-xl ring-4 ring-gray-200" alt="Perfil" />
            <div>
            <h4 className="font-bold text-gray-900">{`${firstName} ${lastName}`}</h4>
              <p className="text-gray-800 text-xs">Desarrollador fullstack</p>
            </div>
          </div>
        </section>
      </aside> 
    </div>
  )
}

export default Slider;
