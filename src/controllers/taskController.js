const { validationResult } = require('express-validator');
const taskService = require('../services/taskService');

exports.createTask = async (req, res) => {
  // Request validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  // Request validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedTask = await taskService.updateTask(req.params.id, req.body);
    res.json(updatedTask);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const tasks = await taskService.getAllTasks(page, pageSize);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getTaskMetrics = async (req, res) => {
  try {
    const metrics = await taskService.getTaskMetrics();
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
