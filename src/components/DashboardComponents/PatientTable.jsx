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
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full">
      <h2 className="text-2xl font-bold mb-4">Pacientes</h2>
      <TableContainer component={Paper} className="rounded-xl overflow-hidden">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" >Imagen</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Edad</TableCell>
              <TableCell align="center">Género</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Ver Paciente</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.slice(0, maxPatientsToShow).map((patient) => ( // Use slice() to limit the number of patients rendered
              <TableRow key={patient.id}>
                <TableCell>
                  <Avatar alt={patient.name} src={patient.imageUrl} />
                </TableCell>
                <TableCell align="center">{`${patient.name} ${patient.paternalLastName} ${patient.maternalLastName}`}</TableCell>
                <TableCell align="center">{patient.age}</TableCell>
                <TableCell align="center">{patient.gender}</TableCell>
                <TableCell align="center">
                  <span className={`px-2 py-1 rounded-full text-sm font-bold ${patient.status === 'Stable' ? 'text-green-600 bg-green-100' : patient.status === 'Serious' ? 'text-yellow-600 bg-yellow-100' : 'text-red-600 bg-red-100'}`}>
                    {patient.status}
                  </span>
                </TableCell>
                <TableCell align="center">
                  <Link to={`/content/${patient.id}`} className="bg-slate-100 inline-flex justify-center items-center rounded-full p-2">
                    <MdRemoveRedEye className="text-blue-500 text-lg center" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-4 text-right">
        <Link to="/Pacientes" className="border border-blue-500 text-blue-500 py-2 px-4 hover:bg-blue-500 hover:text-white rounded-xl transition-colors duration-200 ml-auto">
          Ver todos los pacientes
        </Link>

      </div>
    </div>
  );
}

export default PatientTable;
