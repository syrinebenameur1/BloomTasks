const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

// GET /api/tasks
router.get('/', auth, getTasks);
// POST /api/tasks
router.post('/', auth, createTask);
// PUT /api/tasks/:id
router.put('/:id', auth, updateTask);
// DELETE /api/tasks/:id
router.delete('/:id', auth, deleteTask);

module.exports = router;
