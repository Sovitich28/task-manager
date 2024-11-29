const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all tasks
router.get('/', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a task
router.post('/', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO tasks (name) VALUES (?)', [name], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, name });
  });
});

// Delete a task
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

module.exports = router;
