const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//codigo para el form del paciente
app.post('/api/patients', (req, res) => {
  const { name, paternalLastName, maternalLastName, age, gender, status, email, password } = req.body;

  connection.query(
    'INSERT INTO patients (name, paternalLastName, maternalLastName, age, gender, status, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [name, paternalLastName, maternalLastName, age, gender, status, email, password],
    (error, results) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        res.status(201).json({ id: results.insertId });
      }
    }
  );
});

//Codigo y conexion para inciar sesion

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  connection.query(
    'SELECT * FROM patients WHERE email = ?',
    [email],
    (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: 'Email no encontrado' });
        } else {
          const patient = results[0];
          if (patient.password !== password) {
            res.status(401).json({ message: 'Contraseña incorrecta' });
          } else {
            res.status(200).json({ message: 'Inicio de sesión exitoso', patient });
          }
        }
      }
    }
  );
});

//Conexion de la tabla del home
app.get('/api/patients', (req, res) => {
  console.log('GET request to /api/patients received');
  connection.query('SELECT * FROM patients', (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Error interno del servidor' });
    } else {
      res.status(200).json(results);
    }
  });
});

// eliminar un paciente
app.delete('/api/patients/:id', (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM patients WHERE id = ?', [id], (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Error interno del servidor' });
    } else {
      res.status(200).json({ message: 'Paciente eliminado exitosamente' });
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server iniciado en el puerto ${PORT}`);
});
