import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RiUserLine, RiMailLine, RiLockPasswordLine } from 'react-icons/ri';
import { BiMaleSign, BiFemaleSign } from 'react-icons/bi';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';


const PatientForm = () => {
    const [name, setName] = useState('');
    const [paternalLastName, setPaternalLastName] = useState('');
    const [maternalLastName, setMaternalLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [CURP, setCurp] = useState('');
   
const handleDateChange = (date) => {
    setBirthdate(date);
    const now = dayjs();
    const birthDate = dayjs(date);
    const calculatedAge = now.diff(birthDate, 'year');
    setAge(calculatedAge);
};

    const submitPatient = async (patientData) => {
        try {
            const response = await axios.post('http://localhost:3001/api/patients', patientData);
            console.log('Paciente creado con éxito:', response.data);
            toast.success("El paciente ha sido agregado correctamente", {
                position: toast.POSITION.TOP_RIGHT,

            });
        } catch (error) {
            console.error('Error al crear paciente:', error);
            toast.error("Error al agregar paciente", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    const validateForm = () => {
        let isValid = true;

        if (!name) {
            toast.error('Por favor, completa el campo Nombre(s)', {
                position: toast.POSITION.TOP_RIGHT,
            });
            isValid = false;
        }

        if (!paternalLastName) {
            toast.error('Por favor, completa el campo Apellido paterno', {
                position: toast.POSITION.TOP_RIGHT,
            });
            isValid = false;
        }

        if (!maternalLastName) {
            toast.error('Por favor, completa el campo Apellido materno', {
                position: toast.POSITION.TOP_RIGHT,
            });
            isValid = false;
        }
        if (!birthdate){
            toast.error('Por favor, completa rl campo fecha de nacimiento', {
                position: toast.POSITION.TOP_RIGHT,
            });
            isValid = false;
        }

        if (!age) {
            toast.error('Por favor, completa el campo Edad', {
                position: toast.POSITION.TOP_RIGHT,
            });
            isValid = false;
        }

        if (!gender) {
            toast.error('Por favor, selecciona un género', {
                position: toast.POSITION.TOP_RIGHT,
            });
            isValid = false;
        }

        if (!CURP) {
            toast.error('Por favor, agrega la CURP del paciente', {
                position: toast.POSITION.TOP_RIGHT,
            });
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        submitPatient({ name, paternalLastName, maternalLastName, age, birthdate, gender, CURP });
        setName('');
        setPaternalLastName('');
        setMaternalLastName('');
        setBirthdate('');
        setAge('');
        setGender('');
        setCurp('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold mb-2">Formulario</h2>
            <div className="px-4 py-8 flex flex-col md:flex-row md:items-center md:justify-center gap-8">
                <div className="w-full flex flex-col gap-y-2">
                    <label>Nombre(s) <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <RiUserLine className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
                        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-lg outline-none" placeholder="Escribe tu nombre" />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-y-2">
                    <label>Apellido paterno <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <RiUserLine className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
                        <input id="paternal-last-name" type="text" value={paternalLastName} onChange={(e) => setPaternalLastName(e.target.value)}
                            className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-lg outline-none" placeholder="Escribe tu apellido paterno" />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-y-2">
                    <label> Apellido materno <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <RiUserLine className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
                        <input id="maternal-last-name" type="text" value={maternalLastName} onChange={(e) => setMaternalLastName(e.target.value)}
                            className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-lg outline-none" placeholder="Escribe tu apellido materno" />
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-y-2">
                <div>
                <label>Fecha de Nacimiento <span className="text-red-500">*</span></label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Fecha de Nacimiento"
                        value={birthdate}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <div className="w-full flex flex-col gap-y-2">
                <label>Edad Calculada</label>
                <input
                    type="text"
                    value={age}
                    className="w-full bg-gray-100 py-2 px-4 rounded-lg outline-none"
                    disabled
                />
            </div>
                </div>
                <div>
                    <div className="w-full flex flex-col gap-y-2">
                        <label htmlFor="gender" className="block font-medium text-gray-700">Género <span className="text-red-500">*</span></label>
                        <div className="relative">
                            {gender === "Male" ? (
                                <BiMaleSign className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
                            ) : gender === "Female" ? (
                                <BiFemaleSign className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
                            ) : (
                                <div className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4">
                                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2-1a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5z"
                                            clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}
                                className="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2 pl-10 pr-8 rounded-lg shadow-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option value="" className="text-gray-400">Seleccione un género</option>
                                <option value="Male" className="text-gray-700">Masculino</option>
                                <option value="Female" className="text-gray-700">Femenino</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2-1a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-y-2">
                    <label>CURP<span className="text-red-500">*</span></label>
                    <div className="relative">
                        <RiUserLine className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
                        <input id="Curp" type="text" value={CURP} onChange={(e) => setCurp(e.target.value)}
                            className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-lg outline-none" placeholder="Escribe tu apellido materno" />
                    </div>
                </div>
            <div className="px-6 py-4 -10 flex justify-end space-x-2">
                <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-900 transition-colors">
                    Guardar
                </button>
            </div>

        </form>
    );
};

export default PatientForm;