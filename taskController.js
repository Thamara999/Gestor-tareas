const db = require('../db');

// Obtener todas las tareas
exports.getAllTasks = (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Crear una nueva tarea
exports.createTask = (req, res) => {
  const { title, description, due_date } = req.body;
  db.query('INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?)',
    [title, description, due_date], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: results.insertId, title, description, due_date });
    });
};

// Actualizar una tarea existente
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, due_date } = req.body;
  db.query('UPDATE tasks SET title = ?, description = ?, due_date = ? WHERE id = ?',
    [title, description, due_date, id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id, title, description, due_date });
    });
};

// Eliminar una tarea
exports.deleteTask = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).send();
  });
};
