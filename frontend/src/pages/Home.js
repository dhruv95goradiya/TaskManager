import React, { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Home = () => {
  const [editTask, setEditTask] = useState(null);

  const handleTaskUpdated = (updatedTask) => {
    // Handle task updated event
  };

  const handleCancel = () => {
    // Handle cancel operation
    setEditTask(null); // Reset edit task
  };

  return (
    <div>
      <TaskForm task={editTask} onTaskUpdated={handleTaskUpdated} onCancel={handleCancel} />
      <TaskList/>
    </div>
  );
};

export default Home;
