// app.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/AuthRoutes');
const sequelize = require('./config/db');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
