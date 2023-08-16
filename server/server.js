const express = require('express');
const connection = require('./db');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const saltRounds = 10;

// Código para el formulario del paciente
app.post('/api/patients', (req, res) => {
  const { name, paternalLastName, maternalLastName, age, gender, status, email, password } = req.body;
  const role = 'patient';

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      connection.query(
        'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
        [email, hashedPassword, role],
        (error, results) => {
          if (error) {
            res.status(500).json({ error });
          } else {
            const userId = results.insertId;

            connection.query(
              'INSERT INTO patients (user_id, name, paternalLastName, maternalLastName, age, gender, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
              [userId, name, paternalLastName, maternalLastName, age, gender, status],
              (error, results) => {
                if (error) {
                  res.status(500).json({ error });
                } else {
                  res.status(201).json({ id: results.insertId });
                }
              }
            );
          }
        }
      );
    }
  });
});

// Código y conexión para iniciar sesión
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: 'Email no encontrado' });
        } else {
          const user = results[0];

          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              res.status(500).json({ message: 'Error interno del servidor' });
            } else {
              if (result) {
                connection.query(
                  'SELECT * FROM patients WHERE user_id = ?',
                  [user.id],
                  (error, results) => {
                    if (error) {
                      res.status(500).json({ message: 'Error interno del servidor' });
                    } else {
                      res.status(200).json({ message: 'Inicio de sesión exitoso', user, patient: results[0] });
                    }
                  }
                );
              } else {
                res.status(401).json({ message: 'Contraseña incorrecta' });
              }
            }
          });
        }
      }
    }
  );
});

// Conexión de la tabla del home
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

// Eliminar un paciente
app.delete('/api/patients/:id', (req,   res) => {
  const { id } = req.params;

  connection.query('SELECT user_id FROM patients WHERE id = ?', [id], (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Error interno del servidor' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Paciente no encontrado' });
      } else {
        const userId = results[0].user_id;

        connection.query('DELETE FROM patients WHERE id = ?', [id], (error, results) => {
          if (error) {
            res.status(500).json({ message: 'Error interno del servidor' });
          } else {
            connection.query('DELETE FROM users WHERE id = ?', [userId], (error, results) => {
              if (error) {
                res.status(500).json({ message: 'Error interno del servidor' });
              } else {
                res.status(200).json({ message: 'Paciente eliminado exitosamente' });
              }
            });
          }
        });
      }
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server iniciado en el puerto ${PORT}`);
});

