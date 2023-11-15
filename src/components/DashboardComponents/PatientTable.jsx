import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { MdRemoveRedEye } from 'react-icons/md';

function PatientTable() {
  const [patients, setPatients] = useState([]);
  const maxPatientsToShow = 5;

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    try {
      const response = await fetch('http://localhost:3001/api/patients');
      const data = await response.json();
      setPatients(data.map(patient => ({
        ...patient,
        bgColor: getRandomColor()
      })));
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  }

  // Función para obtener un color aleatorio
  function getRandomColor() {
    const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Función para obtener las iniciales del nombre
  function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('');
  }

  return (
    <div className="bg-white p-4 sm:p-6 mx-auto max-w-4xl rounded-xl shadow-lg w-full">
      <h2 className="text-2xl font-bold mb-4 tracking-wide">Pacientes</h2>
      <TableContainer component={Paper} className="rounded-xl overflow-hidden">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="px-4 py-2 text-gray-700 font-semibold">Imagen</TableCell>
              <TableCell align="center" className="px-4 py-2 text-gray-700 font-semibold">Nombre</TableCell>
              <TableCell align="center" className="px-4 py-2 text-gray-700 font-semibold">Edad</TableCell>
              <TableCell align="center" className="px-4 py-2 text-gray-700 font-semibold">Género</TableCell>
              <TableCell align="center" className="px-4 py-2 text-gray-700 font-semibold">Estado</TableCell>
              <TableCell align="center" className="px-4 py-2 text-gray-700 font-semibold">Ver Paciente</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.slice(0, maxPatientsToShow).map((patient) => (
              <TableRow key={patient.id}>
                <TableCell align="center">
                  {patient.imageUrl ? (
                    <Avatar alt={patient.name} src={patient.imageUrl} />
                  ) : (
                    <Avatar className={`${patient.bgColor} text-white`}>
                      {getInitials(patient.name)}
                    </Avatar>
                  )}
                </TableCell>
                <TableCell align="center">{`${patient.name} ${patient.paternalLastName} ${patient.maternalLastName}`}</TableCell>
                <TableCell align="center">{patient.age}</TableCell>
                <TableCell align="center">{patient.gender}</TableCell>
                <TableCell align="center">
                  <span className={`px-2 py-1 rounded-full text-sm font-bold shadow-sm ${patient.status === 'Stable' ? 'text-green-600 bg-green-100' : patient.status === 'Serious' ? 'text-yellow-600 bg-yellow-100' : 'text-red-600 bg-red-100'}`}>
                    {patient.status}
                  </span>
                </TableCell>
                <TableCell align="center">
                  <Link to={`/content/${patient.id}`} className="bg-slate-100 inline-flex justify-center items-center rounded-full p-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-300 transition ease-in-out duration-150">
                    <MdRemoveRedEye className="text-blue-500 text-lg center" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-4 text-right">
        <Link to="/Pacientes" className="border border-blue-500 text-blue-500 py-2 px-4 hover:bg-blue-500 hover:text-white rounded-xl transition-colors duration-200 ml-auto shadow focus:outline-none focus:ring-2 focus:ring-blue-300">
          Ver todos los pacientes
        </Link>
      </div>
    </div>
  );
}

export default PatientTable;


