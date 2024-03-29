// TaskList.js

import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import taskService from '../services/taskService';
import './Task.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await taskService.getAllTasks();
      setTasks(fetchedTasks.data);
    };

    fetchTasks();
  }, []);

  const handleEdit = (task) => {
    setEditTask(task);
  };

  const handleCancelEdit = () => {
    setEditTask(null);
  };

  const handleTaskUpdated = async (updatedTask) => {
    try {
      const response = await taskService.updateTask(updatedTask.id, updatedTask);
      if (response.success) {
        const updatedTasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
        setTasks(updatedTasks);
        setEditTask(null);
      } else {
        console.error('Error updating task:', response.message);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleTaskDeleted = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="task-list-container">
      <h2>Task List</h2>
      <div className="task-list">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={handleEdit}
            onDelete={handleTaskDeleted}
          />
        ))}
      </div>
      {editTask && (
        <TaskForm
          task={editTask} // Pass the task data to TaskForm when editing
          onTaskUpdated={handleTaskUpdated}
          onCancel={handleCancelEdit}
          isEdit={true}
        />
      )}
    </div>
  );
};

export default TaskList;
