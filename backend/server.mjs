// server.js
import express from 'express';
import { createTask, updateTask, deleteTask, getAllTasks } from './db/index.mjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const PORT = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());

// Serve static files from the 'build' directory
app.use(express.static(join(__dirname, '../frontend/build'), {
  // Specify MIME types for specific file extensions
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    }
  }
}));

// Serve index.html for all routes
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../frontend/build', 'index.html'));
});

// Endpoint to create a new task
app.post('/tasks', async (req, res) => {
  try {
    const newTask = await createTask(req.body);
    res.status(201).json({
      success: true,
      data: newTask,
      status: 201,
      message: 'Task created successfully.'
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create task.',
      status: 500,
      message: error.message
    });
  }
});

// Endpoint to update an existing task
app.put('/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await updateTask(req.params.id, req.body);
    res.json({
      success: true,
      data: updatedTask,
      status: 200,
      message: 'Task updated successfully.'
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update task.',
      status: 500,
      message: error.message
    });
  }
});

// Endpoint to delete a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    await deleteTask(req.params.id);
    res.status(204).json({
      success: true,
      status: 204,
      message: 'Task deleted successfully.'
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete task.',
      status: 500,
      message: error.message
    });
  }
});

// Endpoint to get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json({
      success: true,
      data: tasks,
      status: 200,
      message: 'Tasks retrieved successfully.'
    });
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve tasks.',
      status: 500,
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
