import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Change this to your backend server URL

const taskService = {
  getAllTasks: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error; // Re-throw the error for handling in the component
    }
  },
  createTask: async (taskData) => {
    try {
      const response = await axios.post(`${BASE_URL}/tasks`, taskData);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },
  updateTask: async (taskId, taskData) => {
    try {
      const response = await axios.put(`${BASE_URL}/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },
  deleteTask: async (taskId) => {
    try {
      await axios.delete(`${BASE_URL}/tasks/${taskId}`);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};

export default taskService;
