const { processEmailQueue } = require('./services/NotificationService');
const cron = require('node-cron');

const startApplication = async () => {
  try {
    cron.schedule('* * * * *', async () => {
      console.log('Running cron job to process email queue');
      await processEmailQueue();
    });

    console.log('Cron job scheduled successfully');
  } catch (error) {

    console.error('Failed to start application:', error);
  }
};

startApplication();