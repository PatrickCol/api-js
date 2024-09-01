const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 8002;

// Middleware para parsear cuerpos de solicitud
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta para obtener todos los estudiantes
app.get('/students', (req, res) => {
  const sql = 'SELECT * FROM students';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Ruta para crear un nuevo estudiante
app.post('/students', (req, res) => {
  const { firstname, lastname, gender, age } = req.body;
  const sql = `INSERT INTO students (firstname, lastname, gender, age)
               VALUES (?, ?, ?, ?)`;
  const params = [firstname, lastname, gender, age];
  
  db.run(sql, params, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'Student created', id: this.lastID });
  });
});

// Ruta para obtener un solo estudiante por ID
app.get('/student/:id', (req, res) => {
  const sql = 'SELECT * FROM students WHERE id = ?';
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: row });
  });
});

// Ruta para actualizar un estudiante
app.put('/student/:id', (req, res) => {
  const { firstname, lastname, gender, age } = req.body;
  const sql = `UPDATE students SET 
               firstname = ?, lastname = ?, gender = ?, age = ?
               WHERE id = ?`;
  const params = [firstname, lastname, gender, age, req.params.id];
  
  db.run(sql, params, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'Student updated', changes: this.changes });
  });
});

// Ruta para eliminar un estudiante
app.delete('/student/:id', (req, res) => {
  const sql = 'DELETE FROM students WHERE id = ?';
  const params = [req.params.id];
  
  db.run(sql, params, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'Student deleted', changes: this.changes });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
