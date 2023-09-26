// src/services/taskService.js
const DatabaseService = require('./dbService');

const dbService = new DatabaseService();

exports.createTask = async (taskData) => {
  return dbService.createTask(taskData);
};

exports.updateTask = async (taskId, taskData) => {
  return dbService.updateTask(taskId, taskData);
};

exports.getAllTasks = async (page, pageSize) => {
  return dbService.getAllTasks(page, pageSize);
};

exports.getTaskMetrics = async () => {
  return dbService.getTaskMetrics();
};
