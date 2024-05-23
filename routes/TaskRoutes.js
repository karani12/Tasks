const express = require('express');
const { createTask, getTasks, updateTaskStatus } = require('../controllers/TaskController');
const { taskValidation } = require('../utils/validators');
const auth = require('../middleware/AuthMiddleware');
const canCreateTask = require('../middleware/canCreateTasks');

const router = express.Router();

router.post('/tasks', auth, taskValidation, canCreateTask, createTask);
router.get('/tasks', auth, getTasks);
router.put('/tasks/:id', auth, updateTaskStatus);

module.exports = router;
