// services/notificationService.js
const nodemailer = require("nodemailer");
const Queue = require("../models/QueueModel");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmailNotification = async (to, subject, text, id) => {
  try {
    await transporter.sendMail({
      from: "mailtrap@tajitest.xyz",
      to,
      subject,
      text,
    });
    const queueItem = await Queue.findByPk(id);
    queueItem.status = "sent";
  } catch (error) {
    console.error("Error sending email notification:", error);
  }
};

const processEmailQueue = async () => {
  try {
    console.log("hey");

    const queueItems = await Queue.findAll({
      where: {
        status: "pending",
      },
    });
    console.log(queueItems);
    for (const item of queueItems) {
      await sendEmailNotification(item.to, item.subject, item.text, item.id);
    }
  } catch (error) {
    console.error("Error processing email queue:", error);
  }
};

module.exports = {
  sendEmailNotification,
  processEmailQueue,
};
