// middleware/canCreateTask.js
const User = require('../models/UserModel');

const canCreateTask = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Forbidden' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = canCreateTask;
