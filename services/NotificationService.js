// services/notificationService.js
const nodemailer = require("nodemailer");
const  Queue  = require("../models/QueueModel");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmailNotification = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log("Email notification sent successfully");
  } catch (error) {
    console.error("Error sending email notification:", error);
  }
};

const processEmailQueue = async () => {
  try {
    console.log("hey")

    const queueItems = await Queue.findAll({
        where: {
            status: "pending"
        }
    })
    console.log(queueItems)
    for (const item of queueItems) {
      await sendEmailNotification(item.to, item.subject, item.text);
      item.status = "completed";
      await item.save();
    }
  } catch (error) {
    console.error("Error processing email queue:", error);
  }
};

module.exports = {
  sendEmailNotification,
  processEmailQueue,
};
