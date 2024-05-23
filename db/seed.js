const { faker } = require("@faker-js/faker");
const User = require("../models/UserModel");
const Task = require("../models/TaskModel");
const db = require("../config/db");
const bcrypt = require("bcryptjs");

const createUser = async () => {
  const user = await User.create({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(["admin", "user"]),
    password: await bcrypt.hash("password", 10),
  });
  return user;
};

const createTask = async (user) => {
  const task = await Task.create({
    title: faker.lorem.words(),
    description: faker.lorem.sentence(),
    dueDate: faker.date.future(),
    priority: faker.helpers.arrayElement(["low", "medium", "high"]),
    status: faker.helpers.arrayElement(["pending", "completed"]),
    assignedUserId: user.id,
    assignedById: user.id,
  });
  return task;
};

const seedDB = async (numUsers = 10, numTasksPerUser = 5) => {
  await db.sync({ force: true });

  const users = [];
  for (let i = 0; i < numUsers; i++) {
    const user = await createUser();
    users.push(user);
  }

  for (const user of users) {
    if (user.role === "admin") {
      for (let i = 0; i < numTasksPerUser; i++) {
        await createTask(faker.helpers.arrayElement(users));
      }
    }

  }

    console.log("Database seeded successfully");
};

seedDB().then(() => {
  process.exit();
});
