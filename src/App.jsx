import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Route, Router, Routes } from 'react-router-dom';
import AppContent from './components/AppContent';
import { Dashboard } from './components';
import Pacientes from './pages/ViewPatients';
import CrearUsuario from './pages/NewUsers';
import Alertas from './pages/HistoryAlerts';
import Login from './pages/Login'

const App = () => {
  return (
    <>
      <ToastContainer theme="colored" position="bottom-right" autoClose={5000} />
      <Routes>
        <Route>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/content" element={<AppContent />} />
          <Route path="/Pacientes" element={<Pacientes />} />
          <Route path='/CrearUsuario' element={<CrearUsuario/>} />
          <Route path='/Alertas' element={<Alertas/>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

