// tests/taskController.test.js
const request = require('supertest');
const app = require('../src/app');

const mockCreateTask = jest.fn();
const mockUpdateTask = jest.fn();
const mockGetAllTasks = jest.fn();
const mockGetTaskMetrics = jest.fn();

jest.mock('../src/services/dbService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      createTask: mockCreateTask,
      updateTask: mockUpdateTask,
      getAllTasks: mockGetAllTasks,
      getTaskMetrics: mockGetTaskMetrics,
    };
  });
});

beforeEach(() => {
  mockCreateTask.mockClear();
  mockUpdateTask.mockClear();
  mockGetAllTasks.mockClear();
  mockGetTaskMetrics.mockClear();
});

describe('Task Controller', () => {
  // Define test data
  const testData = {
    title: 'Test Task',
    description: 'This is a test task',
    status: 'open',
  };

  let createdTaskId;

  it('should create a new task', async () => {
    mockCreateTask.mockResolvedValueOnce({ ...testData, id: 1 });

    const response = await request(app)
      .post('/tasks')
      .send(testData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdTaskId = response.body.id;
    expect(mockCreateTask).toHaveBeenCalledWith(testData);
  });

  it('should update an existing task', async () => {
    const updatedData = {
      title: 'Updated Task',
      description: 'This task has been updated',
      status: 'completed',
    };

    mockUpdateTask.mockResolvedValueOnce({ ...updatedData, id: createdTaskId });

    const response = await request(app)
      .put(`/tasks/${createdTaskId}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedData.title);
    expect(response.body.description).toBe(updatedData.description);
    expect(response.body.status).toBe(updatedData.status);
    expect(mockUpdateTask).toHaveBeenCalledWith(createdTaskId, updatedData);
  });
});
