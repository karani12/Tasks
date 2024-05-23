const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./UserModel');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed'),
    defaultValue: 'pending',
  },
  assignedUserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  assignedById: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

Task.belongsTo(User, { as: 'assignedUser', foreignKey: 'assignedUserId' });
Task.belongsTo(User, { as: 'assignedBy', foreignKey: 'assignedById' });

module.exports = Task;
