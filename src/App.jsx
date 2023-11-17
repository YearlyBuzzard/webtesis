import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Route, Router, Routes } from 'react-router-dom';
import AppContent from './components/AppContent';
import { Dashboard } from './components';
import Pacientes from './pages/ViewPatients';
import CrearUsuario from './pages/NewUsers';
import Alertas from './pages/HistoryAlerts';
import Login from './pages/auth/Login'
import Register from './pages/auth/Register';
import Perfil_Usuario from '././pages/UserProfile';

const App = () => {
  return (
    <>
      {/* ToastContainer: Configuración para notificaciones */}
      <ToastContainer theme="colored" position="bottom-right" autoClose={5000} closeOnClick={false} />

      {/* Definición de rutas utilizando React Router */}
      <Routes>
        <Route>
          {/* Ruta para la página de inicio de sesión */}
          <Route path="/" element={<Login />} />
          {/* Ruta para el panel de control */}
          <Route path="/Dashboard" element={<Dashboard />} />
          {/* Ruta para la página de contenido de la aplicación */}
          <Route path="/content/:patientId" element={<AppContent />} />
          {/* <Route path="/content" element={<AppContent />} /> */}
          {/* Ruta para la lista de pacientes */}
          <Route path="/Pacientes" element={<Pacientes />} />

          <Route path="/Perfil_Usuario" element={<Perfil_Usuario/>} />
          {/* Ruta para la creación de usuarios */}
          <Route path='/CrearUsuario' element={<CrearUsuario />} />
          {/* Ruta para la página de historial de alertas */}
          <Route path='/Alertas' element={<Alertas />} />
          {/* Ruta para el registro de administradores */}
          <Route path='/RegisterAdmin' element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
