import React, { useState } from 'react';
import { FaUserMd, FaUser, FaRegHospital, FaEnvelope, FaLock } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    userType: '',
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[#F2F4FE] flex items-center justify-center p-4">
       <div className="max-w-lg">
        <div className="flex justify-center mb-8">
          <FaRegHospital className="text-4xl text-blue-500" />
        </div>
        <div className="bg-white w-full rounded-lg p-8 mb-8">
          <div className="flex flex-col items-center gap-1 mb-8">
            <h1 className="text-xl text-gray-900">Crear cuenta</h1>
            <p className="text-gray-400 text-sm">
              Crea tu cuenta dentro de la plataforma y disfruta
            </p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="relative">
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full border py-2 px-4 rounded-md outline-none"
            >
              <option value="" disabled>Selecciona tipo de cuenta</option>
              <option value="doctor">Doctor</option>
              <option value="paciente">Paciente</option>
            </select>
          </div>
          <div className="relative">

            <FaUser className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border py-2 pl-10 pr-4 rounded-md outline-none"
              placeholder="Ingresa tu nombre"
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border py-2 pl-10 pr-4 rounded-md outline-none"
              placeholder="Ingresa tu correo"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border py-2 pl-10 pr-4 rounded-md outline-none"
              placeholder="Ingresa tu contraseña"
            />
          </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 py-2 px-4 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
        <span className="flex items-center justify-center gap-2">
          ¿Ya tienes cuenta?{' '}
          <a href="#" className="text-blue-500">
            Inicia sesión
          </a>
        </span>
      </div>
    </div>
  );
};

export default Register;
