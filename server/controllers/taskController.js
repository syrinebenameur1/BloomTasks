const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        // .lean(): retrieve plain JS objects for speed
        const tasks = await Task.find({ userId: req.user.userId }).lean();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tasks', error: err });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { title, description, priority, status } = req.body;
        const task = new Task({
            title,
            description,
            priority,
            status,
            userId: req.user.userId,
        });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: 'Error creating task', error: err });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { title, description, priority, status } = req.body;
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            { title, description, priority, status },
            { new: true }
        );
        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: 'Error updating task', error: err });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const result = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
        if (!result) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting task', error: err });
    }
};
