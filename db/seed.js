const { faker } = require("@faker-js/faker")
const User = require('../models/UserModel');
const Task = require('../models/TaskModel');
const db = require('../config/db');
const bcrypt = require('bcryptjs');


const createUser = async () => {
    const user = await User.create({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: await bcrypt.hash('password', 10)
    });
    return user;
};

const createTask = async (user) => {
    const task = await Task.create({
        title: faker.lorem.words(),
        description: faker.lorem.sentence(),
        dueDate: faker.date.future(),
        priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
        status: 'pending',
        assignedUserId: user.id,
        assignedById: user.id
    });
    return task;
};

const seedDB = async (numUsers = 10, numTasksPerUser = 5) => {
    await db.sync({ force: true }); 

    for (let i = 0; i < numUsers; i++) {
        const user = await createUser();
        for (let j = 0; j < numTasksPerUser; j++) {
            await createTask(user);
        }
    }
    console.log('Data seeded!');
};

seedDB().then(() => {
    process.exit(); 
});
