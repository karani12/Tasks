const taskService = require('../services/TaskService');
const { validationResult } = require('express-validator');
const { taskValidation } = require('../utils/validators');
const User = require('../models/UserModel');

const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const taskData = { ...req.body, assignedById: req.user.id };
    const task = await taskService.createTask(taskData);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
   
    const tasks = await taskService.getTasksByUser(req.user.id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    // get user
    const user = await User.findByPk(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

   
    const tasks = await taskService.getAllTasks();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await taskService.updateTaskStatus(req.params.id, status, req.user.id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getAllTasks,
  updateTaskStatus,
};
