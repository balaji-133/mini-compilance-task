const express = require('express');
const Client = require('../models/Client');
const Task = require('../models/Task');

const router = express.Router();

// Get all clients
router.get('/clients', async (req, res) => {
  try {
    const clients = await Client.find().sort({ companyName: 1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clients', details: error.message });
  }
});

// Get tasks for a specific client
router.get('/tasks/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params;
    const tasks = await Task.find({ clientId }).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks', details: error.message });
  }
});

// Create a new task
router.post('/tasks', async (req, res) => {
  try {
    const { clientId, title, description, category, dueDate, priority } = req.body;
    
    // Basic validation
    if (!clientId || !title || !category || !dueDate || !priority) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newTask = new Task({
      clientId,
      title,
      description,
      category,
      dueDate,
      priority,
      status: 'Pending'
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task', details: error.message });
  }
});

// Update a task (e.g. status)
router.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task', details: error.message });
  }
});

module.exports = router;
