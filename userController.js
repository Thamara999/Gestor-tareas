const db = require('../db');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  // Lógica para registrar un usuario
};

exports.login = async (req, res) => {
  // Lógica para autenticar y manejar el inicio de sesión
};

// Crear un nuevo usuario
exports.createUser = (req, res) => {
  const { username, password } = req.body;

  // Validar que los campos no estén vacíos
  if (!username || !password) {
    return res.status(400).json({ error: 'Por favor ingresa todos los campos' });
  }

  // Encriptar la contraseña
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Guardar el nuevo usuario en la base de datos
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hash], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: results.insertId, username });
    });
  });
};

// Obtener un usuario por nombre de usuario
exports.getUserByUsername = (req, res) => {
  const { username } = req.params;

  // Validar que el campo no esté vacío
  if (!username) {
    return res.status(400).json({ error: 'Por favor ingresa el nombre de usuario' });
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(results[0]);
  });
};

// Iniciar sesión
exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  // Validar que los campos no estén vacíos
  if (!username || !password) {
    return res.status(400).json({ error: 'Por favor ingresa todos los campos' });
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Comparar la contraseña
    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!isMatch) {
        return res.status(400).json({ error: 'Contraseña incorrecta' });
      }

      res.json({ message: 'Inicio de sesión exitoso' });
    });
  });
};

// Eliminar un usuario
exports.deleteUser = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(204).send();
  });
};
