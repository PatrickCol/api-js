const sqlite3 = require('sqlite3').verbose();

// Crear una conexión a la base de datos SQLite
const db = new sqlite3.Database('students.sqlite', (err) => {
  if (err) {
    console.error('Error al abrir la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
    
    db.run(`CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstname TEXT NOT NULL,
      lastname TEXT NOT NULL,
      gender TEXT NOT NULL,
      age INTEGER
    )`, (err) => {
      if (err) {
        console.error('Error al crear la tabla:', err.message);
      }
    });
  }
});

module.exports = db;
