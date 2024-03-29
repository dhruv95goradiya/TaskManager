// tests/api.test.mjs

import request from 'supertest'; // Import supertest for making HTTP requests to the server
import app from '../backend/server.mjs'; // Import your Express app

describe('API Endpoints', () => {
  let taskId; // Variable to store the ID of the task created during testing

  // Test POST /tasks endpoint
  test('POST /tasks - Create a new task', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'This is a test task.',
      due_date: '2024-12-31',
      status: 'pending'
    };

    const response = await request(app)
      .post('/tasks')
      .send(taskData)
      .expect(201);

    // Store the ID of the created task for later use in other tests
    taskId = response.body.id;

    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe(taskData.title);
    expect(response.body.data.description).toBe(taskData.description);
    expect(response.body.data.due_date).toBe(taskData.due_date);
    expect(response.body.data.status).toBe(taskData.status);
  });

  // Test GET /tasks endpoint
  test('GET /tasks - Get all tasks', async () => {
    const response = await request(app)
      .get('/tasks')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    // Add more assertions as needed to verify the response
  });

  // Test PUT /tasks/:id endpoint
  test('PUT /tasks/:id - Update an existing task', async () => {
    const updatedTaskData = {
      title: 'Updated Test Task',
      description: 'This is an updated test task.',
      due_date: '2025-01-31',
      status: 'completed'
    };

    const response = await request(app)
      .put(`/tasks/${taskId}`)
      .send(updatedTaskData)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe(updatedTaskData.title);
    expect(response.body.data.description).toBe(updatedTaskData.description);
    expect(response.body.data.due_date).toBe(updatedTaskData.due_date);
    expect(response.body.data.status).toBe(updatedTaskData.status);
  });

  // Test DELETE /tasks/:id endpoint
  test('DELETE /tasks/:id - Delete an existing task', async () => {
    const response = await request(app)
      .delete(`/tasks/${taskId}`)
      .expect(204);

    expect(response.body).toEqual({});
  });
});
