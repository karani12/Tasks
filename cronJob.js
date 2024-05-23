// cronJob.js
const cron = require('node-cron');
const { processEmailQueue } = require('./services/NotificationService');

cron.schedule('* * * * *', processEmailQueue);
