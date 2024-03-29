// db/index.js
import pool from './db.mjs';

// Function to create a new task
async function createTask(task) {
  try {
    const { title, description, due_date, status } = task;
    const query = 'INSERT INTO tasks (title, description, due_date, status) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [title, description, due_date, status];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error('Error creating task:', error);
    throw error; // Re-throw the error to propagate it to the caller
  }
}


// Function to update an existing task
async function updateTask(id, task) {
  const { title, description, due_date, status } = task;
  const query = 'UPDATE tasks SET title = $1, description = $2, due_date = $3, status = $4 WHERE id = $5 RETURNING *';
  const values = [title, description, due_date, status, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

// Function to delete a task
async function deleteTask(id) {
  const query = 'DELETE FROM tasks WHERE id = $1';
  const values = [id];
  await pool.query(query, values);
}

// Function to get all tasks
async function getAllTasks() {
  const { rows } = await pool.query('SELECT * FROM tasks');
  return rows;
}

export { createTask, updateTask, deleteTask, getAllTasks };