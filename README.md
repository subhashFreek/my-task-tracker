# Task Tracking Application

**Table of Contents:**

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#1-clone-the-repository-if-not-already-done)
  - [Install Dependencies](#2-install-dependencies)
  - [Set Up Environment Variables](#3-set-up-environment-variables)
  - [Run Database Migrations](#4-run-database-migrations)
  - [Start the Application](#5-start-the-application)
- [Usage](#usage)
  - [Create a Task](#create-a-task)
  - [Update a Task](#update-a-task)
  - [Get All Tasks](#get-all-tasks)
  - [Get Task Metrics](#get-task-metrics)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Overview

This is a simple Node.js task tracking application with CRUD APIs and task metrics. It uses PostgreSQL as the database for storing tasks.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (v14 or higher)
- PostgreSQL installed and running
- Git (optional, for cloning the repository)

## Getting Started

### 1. Clone the Repository (if not already done)

```bash
git clone https://github.com/your-username/my-task-tracker.git
cd my-task-tracker
```

### 2. Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### 3. Set Up Environment Variables

Update the .env file in the project root and define the  DB_NAME, DB_USER, DB_PASSWORD with your PostgreSQL database configuration, and set the desired PORT for your application.

### 4. Run Database Migrations

Run the database migrations to create the required tables in PostgreSQL:

```bash
npx sequelize-cli db:migrate
```

### 5. Start the Application

Start the Node.js application:

```bash
npm start
```

Application will be running at http://localhost:3000.
Usage
Create a Task

To create a new task, send a POST request to http://localhost:3000/tasks with the following JSON data:

```json
{
  "title": "Task Title",
  "description": "Task Description",
  "status": "open"
}
```

Update a Task

To update an existing task, send a PUT request to http://localhost:3000/tasks/{taskId} with the updated JSON data.
Get All Tasks

To retrieve all tasks, send a GET request to http://localhost:3000/tasks.

You can also use query parameters for pagination:

    page: Page number (e.g., page=1)
    pageSize: Number of tasks per page (e.g., pageSize=10)

Get Task Metrics

To get task metrics, send a GET request to http://localhost:3000/tasks/metrics.
Testing

To run unit tests for the application, use the following command:

```bash
npm test
```