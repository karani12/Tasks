const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/AuthRoutes');
const taskRoutes = require('./routes/TaskRoutes');
const sequelize = require('./config/db');
const startJob = require('./cronJob');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);
startJob();

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
