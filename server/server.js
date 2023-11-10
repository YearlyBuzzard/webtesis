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
  const { name, paternalLastName, maternalLastName, age, gender, CURP, email, password } = req.body;

  connection.query(
    'INSERT INTO patients (name, paternalLastName, maternalLastName, age, gender, CURP, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [name, paternalLastName, maternalLastName, age, gender, CURP, email, password],
    (error, results) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        res.status(201).json({ id: results.insertId });
      }
    }
  );
});

//User deshabilitado 
app.patch('/api/patients/:id', (req, res) => {
  const { id } = req.params;
  const { disabled } = req.body;

  connection.query(
    'UPDATE patients SET disabled = ? WHERE id = ?',
    [disabled, id],
    (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
      } else {
        res.status(200).json({ message: 'Paciente actualizado exitosamente' });
      }
    }
  );
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
          // Aquí debes comparar la contraseña después de aplicar el mismo hash que usaste al guardarla
          if (hash(password) !== admin.contraseña) {
            res.status(401).json({ message: 'Contraseña incorrecta' });
          } else {
            // Envía el nombre y apellido como parte de la respuesta
            res.status(200).json({ 
              message: 'Inicio de sesión exitoso', 
              admin: {
                name: admin.nombre,
                lastName: admin.apellido
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server iniciado en el puerto ${PORT}`);
});
