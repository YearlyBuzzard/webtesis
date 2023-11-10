import React, { useState } from "react";
import axios from 'axios';

function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  const registerUser = async () => {
    const url = role === 'doctor' ? 'http://localhost:3001/api/doctors' : 'http://localhost:3001/api/patients';
    const response = await axios.post(url, {
      name,
      email,
      password,
    });
    if (response.status === 201) {
      console.log('Usuario registrado con éxito');
    } else {
      console.log('Ha ocurrido un error al registrar el usuario');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  return (
    <div className="min-h-screen bg-[#F2F4FE] flex items-center justify-center p-4">
      <div className="max-w-lg">
        <div className="flex justify-center mb-8">
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
              <input
                type="text"
                className="w-full border py-2 px-10 rounded-md outline-none"
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="relative">
              <input
                type="email"
                className="w-full border py-2 px-10 rounded-md outline-none"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="relative">
              <input
                type="password"
                className="w-full border py-2 px-10 rounded-md outline-none"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="relative">
              <select
                value={role}
                onChange={handleRoleChange}
                className="w-full border py-2 px-4 rounded-md outline-none"
              >
                <option value="">Selecciona tu rol</option>
                <option value="doctor">Doctor</option>
                <option value="paciente">Paciente</option>
              </select>
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
          ¿Ya tienes cuenta?{" "}
          <a href="#" className="text-blue-500">
            Inicia sesión
          </a>
        </span>
      </div>
    </div>
  );
}

export default RegistrationForm;
