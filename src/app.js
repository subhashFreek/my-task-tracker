// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const taskRoutes = require('./routes/taskRoutes');
const logger = require('./utils/logger');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config(); // Load environment variables from .env file

// Middleware
app.use(bodyParser.json());
app.use(morgan('combined', { stream: logger.stream }));

// Routes
app.use('/tasks', taskRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

module.exports = app; // Export app for testing
