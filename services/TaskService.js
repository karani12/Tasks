const Task = require('../models/TaskModel');
const User = require('../models/UserModel');

const createTask = async (taskData) => {
  const task = await Task.create(taskData);
  // Notify assigned user (to be implemented)
  return task;
};

const getTasksByUser = async (userId) => {
  return await Task.findAll({ where: { assignedUserId: userId } });
};

const getTaskById = async (taskId) => {
  return await Task.findByPk(taskId);
};

const updateTaskStatus = async (taskId, status, userId) => {
  const task = await Task.findByPk(taskId);
  if (task && task.assignedUserId === userId) {
    task.status = status;
    await task.save();
    // Notify user who assigned the task (to be implemented)
    return task;
  } else {
    throw new Error('Unauthorized');
  }
};

module.exports = {
  createTask,
  getTasksByUser,
  getTaskById,
  updateTaskStatus,
};
