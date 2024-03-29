// TaskItem.js

import React from 'react';
import './Task.css'; // Import custom CSS for styling

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const handleUpdate = () => {
    // Pass the task data to the onUpdate callback function
    onUpdate(task);
  };

  const handleDelete = () => {
    // Prompt for confirmation before deleting the task
    if (window.confirm('Are you sure you want to delete this task?')) {
      // Call the onDelete function with the task ID to delete the task
      onDelete(task.id);
    }
  };

  // Function to format the due date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="task-item-container">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p><strong>Due Date:</strong> {formatDate(task?.due_date)}</p> {/* Format due date */}
      <p><strong>Status:</strong> {task?.status}</p>
      <div className="task-item-actions">
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
