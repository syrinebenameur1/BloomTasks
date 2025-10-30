// This is an optional module for seeding/testing.
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Task = require('../models/Task');

const seedData = async () => {
    const password = await bcrypt.hash('password123', 10);
    const user = new User({ name: 'Alice', email: 'alice@example.com', password });
    await user.save();
    const tasks = [
        {
            title: 'First Task',
            description: 'This is the first example task.',
            priority: 'High',
            status: 'To Do',
            userId: user._id,
        },
        {
            title: 'Second Task',
            description: 'Another task for demo.',
            priority: 'Medium',
            status: 'In Progress',
            userId: user._id,
        }
    ];
    await Task.insertMany(tasks);
    console.log('Seed data inserted');
};

module.exports = { seedData };
