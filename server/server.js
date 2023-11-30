const express = require('express');
const cors = require('cors');
const connection = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// código para registrar doctores
app.post('/api/doctors', (req, res) => {
  const { name, email, password } = req.body;

  connection.query(
    'INSERT INTO doctores (name, email, password) VALUES (?, ?, ?)',
    [name, email, password],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.status(201).json({ id: results.insertId });
    }
  );
});

//codigo para el form del paciente
app.post('/api/patients', (req, res) => {
  const { name, paternalLastName, maternalLastName, age, birthdate, gender, CURP } = req.body;

  connection.query(
    'INSERT INTO patients (name, paternalLastName, maternalLastName, age, birthdate, gender, CURP) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, paternalLastName, maternalLastName, age, birthdate, gender, CURP],
    (error, results) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        res.status(201).json({ id: results.insertId });
      }
    }
  );
});

// Obtener los detalles de un paciente específico por ID
app.get('/api/patients/:id', (req, res) => {
  const { id } = req.params;

  connection.query('SELECT * FROM patients WHERE id = ?', [id], (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Error interno del servidor', error });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Paciente no encontrado' });
      } else {
        res.status(200).json(results[0]);
      }
    }
  });
});


// Obtener pacientes habilitados
app.get('/api/patients/enabled', (req, res) => {
  connection.query('SELECT * FROM patients WHERE enabled = true', (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Error interno del servidor', error });
    } else {
      res.status(200).json(results);
    }
  });
});

// Obtener pacientes deshabilitados
app.get('/api/patients/disabled', (req, res) => {
  connection.query('SELECT * FROM patients WHERE enabled = false', (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Error interno del servidor', error });
    } else {
      res.status(200).json(results);
    }
  });
});


//Codigo y conexion para inciar sesion
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  connection.query(
    'SELECT * FROM administration WHERE email = ?',
    [email],
    (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: 'Email no encontrado' });
        } else {
          const admin = results[0];

          // Hashing the entered password using SHA-256
          const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

          if (hashedPassword !== admin.password) {
            res.status(401).json({ message: 'Contraseña incorrecta' });
          } else {
            // Envía el nombre y apellido como parte de la respuesta
            res.status(200).json({
              message: 'Inicio de sesión exitoso',
              admin: {
                nombre: admin.nombre,  // Asegúrate de que 'admin.nombre' tenga el valor correcto
                apellido: admin.apellido  // Asegúrate de que 'admin.apellido' tenga el valor correcto
              }
            });
          }
        }
      }
    }
  );
});


app.get('/api/getEmail', (req, res) => {
  const userId = req.userId;

  connection.query(
    'SELECT email FROM patients WHERE id = ?',
    [userId],
    (error, results) => {
      if (error) {
        console.error('Error al obtener el correo electrónico:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
          const email = results[0].email;
          res.json({ email });
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server iniciado en el puerto ${PORT}`);
});