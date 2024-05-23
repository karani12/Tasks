const Task = require('../models/TaskModel');
const User = require('../models/UserModel');
const Queue = require('../models/QueueModel');

const createTask = async (taskData) => {
  const task = await Task.create(taskData);
  const sendTo = await User.findByPk(task.assignedUserId);
  const queueItem = await Queue.create({
    to: sendTo.email,
    subject: 'Task Assigned',
    text: `You have been assigned a new task: ${task.title} and tracking number ${task.id} , check your dashboard for more details.`,

  })
  // log the queued item
  console.log(queueItem);

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
