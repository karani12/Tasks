// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;
