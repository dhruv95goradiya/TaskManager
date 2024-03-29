// routes/tasks.mjs
import express from 'express';
import { createTask, updateTask, deleteTask, getAllTasks } from '../db/index.mjs';

const router = express.Router();

// Endpoint to create a new task
router.post('/', async (req, res) => {
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
      error: error.message,
      status: 500,
      message: 'Failed to create task.'
    });
  }
});

// Endpoint to update an existing task
router.put('/:id', async (req, res) => {
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
      error: error.message,
      status: 500,
      message: 'Failed to update task.'
    });
  }
});

// Endpoint to delete a task
router.delete('/:id', async (req, res) => {
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
      error: error.message,
      status: 500,
      message: 'Failed to delete task.'
    });
  }
});

// Endpoint to get all tasks
router.get('/', async (req, res) => {
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
      error: error.message,
      status: 500,
      message: 'Failed to retrieve tasks.'
    });
  }
});

export default router;
