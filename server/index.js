const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/add-patient', async (req, res) => {
    try {
        const { name, age, gender, status, email, password } = req.body;
        const result = await pool.query(
            'INSERT INTO Pacientes (name, age, gender, status, email, password) VALUES (?, ?, ?, ?, ?, ?)',
            [name, age, gender, status, email, password]
        );
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
