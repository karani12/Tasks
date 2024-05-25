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
// get all tasks
const getAllTasks = async () => {
  return await Task.findAll();
};

const getTaskById = async (taskId) => {
  return await Task.findByPk(taskId);
};

const updateTaskStatus = async (taskId, status, userId) => {
  const task = await Task.findByPk(taskId);
  if (task && task.assignedUserId === userId) {
    task.status = status;
    await task.save();
    const sendTo = await User.findByPk(task.assignedById);

   const queuedItem = await Queue.create({
      to: sendTo.email,
      subject: 'Task Status Updated',
      text: `The status of your task: ${task.title} has been updated to ${task.status}.`,
    })
    // log the queued item
    console.log(queuedItem);

    
    return task;
  } else {
    throw new Error('Unauthorized');
  }
};

module.exports = {
  createTask,
  getTasksByUser,
  getTaskById,
  getAllTasks,
  updateTaskStatus,
};
