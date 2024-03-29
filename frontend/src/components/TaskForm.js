import React, { useState, useEffect } from 'react';
import taskService from '../services/taskService';
import './Task.css';

const TaskForm = ({ task, onTaskCreated, onTaskUpdated, onCancel, isEdit }) => {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [due_date, setDueDate] = useState(task ? task.due_date : ''); // Initialize with raw value
  const [status, setStatus] = useState(task ? task.status : '');

  useEffect(() => {
    // Update state when task prop changes (e.g., when editing a different task)
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.due_date);
      setStatus(task.status);
    }
  }, [task]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let day = date.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        const updatedTask = await taskService.updateTask(task.id, { title, description, due_date: due_date, status });
        onTaskUpdated(updatedTask.data);
      } else {
        const newTask = await taskService.createTask({ title, description, due_date: due_date, status });
        onTaskCreated(newTask.data);
      }
      // Reset form fields after submission
      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus('');
      // Close the update form after submission
      onCancel();
    } catch (error) {
      console.error('Error creating/updating task:', error);
    }
  };

  const handleCancel = () => {
    // Call onCancel function passed from parent component
    onCancel();
  };

  return (
    <div className={`task-form-container ${isEdit ? 'edit-mode' : ''}`}>
      <h2>{isEdit ? 'Edit Task' : 'Create New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="date" placeholder="Due Date" value={due_date} onChange={(e) => setDueDate(e.target.value)} />
        <input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
        <button type="submit">{isEdit ? 'Update Task' : 'Create Task'}</button>
        {isEdit && <button type="button" onClick={handleCancel}>Cancel</button>}
      </form>
    </div>
  );
};

export default TaskForm;
