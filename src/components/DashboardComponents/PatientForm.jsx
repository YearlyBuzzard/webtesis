import React, { useState } from 'react';
import { RiUserLine } from 'react-icons/ri';

const PatientForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [paternalLastName, setPaternalLastName] = useState('');
    const [maternalLastName, setMaternalLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, age, gender, status, email, password });
        setName('');
        setAge('');
        setGender('');
        setStatus('');
        setEmail('');
        setPassword('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="px-4 py-8 flex flex-col md:flex-row md:items-center md:justify-center gap-8">
                <div className="w-full flex flex-col gap-y-2">
                    <label>
                        Nombre(s) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <RiUserLine className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-lg outline-none"
                            placeholder="Escribe tu nombre"
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-y-2">
                    <label>
                        Apellido paterno <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <RiUserLine className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
                        <input
                            id="paternal-last-name"
                            type="text"
                            value={paternalLastName}
                            onChange={(e) => setPaternalLastName(e.target.value)}
                            className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-lg outline-none"
                            placeholder="Escribe tu apellido paterno"
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-y-2">
                    <label>
                        Apellido materno <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <RiUserLine className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
                        <input
                            id="maternal-last-name"
                            type="text"
                            value={maternalLastName}
                            onChange={(e) => setMaternalLastName(e.target.value)}
                            className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-lg outline-none"
                            placeholder="Escribe tu apellido materno"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-y-2">
                <div>
                    <label>Edad <span className="text-red-500">*</span> </label>
                    <div className="relative">
                        <RiUserLine className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
                        <input
                            id="age"
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-lg outline-none"
                            placeholder="Ingresa la edad" />
                    </div>
                </div>

                <div>
                    <label htmlFor="gender" className="block font-medium text-gray-700">
                        Género <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <select
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg shadow-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        >
                            <option value="" className="text-gray-400">Seleccione un género</option>
                            <option value="Male" className="text-gray-700">Masculino</option>
                            <option value="Female" className="text-gray-700">Femenino</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2-1a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <label htmlFor="email" className="text-gray-700 font-bold mb-2 block">
                    Correo electrónico
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div>
                <label htmlFor="password" className="text-gray-700 font-bold mb-2 block">
                    Contraseña
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <button type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Agregar Paciente
            </button>
        </form>
    );
};

export default PatientForm;
