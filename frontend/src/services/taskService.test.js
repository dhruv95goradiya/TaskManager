import axios from 'axios';
import taskService from './taskService';

jest.mock('axios');

describe('taskService', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mock calls after each test
  });

  test('getAllTasks returns tasks data', async () => {
    const mockTasks = [{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2' }];
    axios.get.mockResolvedValueOnce({ data: mockTasks });

    const tasks = await taskService.getAllTasks();

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/tasks');
    expect(tasks).toEqual(mockTasks);
  });

  test('createTask sends task data and returns created task', async () => {
    const taskData = { title: 'New Task' };
    const createdTask = { id: 1, title: 'New Task' };
    axios.post.mockResolvedValueOnce({ data: createdTask });

    const newTask = await taskService.createTask(taskData);

    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/tasks', taskData);
    expect(newTask).toEqual(createdTask);
  });

  test('updateTask sends task data and returns updated task', async () => {
    const taskId = 1;
    const taskData = { title: 'Updated Task' };
    const updatedTask = { id: 1, title: 'Updated Task' };
    axios.put.mockResolvedValueOnce({ data: updatedTask });

    const result = await taskService.updateTask(taskId, taskData);

    expect(axios.put).toHaveBeenCalledWith('http://localhost:3000/tasks/1', taskData);
    expect(result).toEqual(updatedTask);
  });

  test('deleteTask sends request to delete task', async () => {
    const taskId = 1;
    axios.delete.mockResolvedValueOnce();

    await taskService.deleteTask(taskId);

    expect(axios.delete).toHaveBeenCalledWith('http://localhost:3000/tasks/1');
  });

  test('getAllTasks throws error when request fails', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(taskService.getAllTasks()).rejects.toThrow(errorMessage);
  });

  test('createTask throws error when request fails', async () => {
    const errorMessage = 'Internal Server Error';
    axios.post.mockRejectedValueOnce(new Error(errorMessage));

    await expect(taskService.createTask({})).rejects.toThrow(errorMessage);
  });

  test('updateTask throws error when request fails', async () => {
    const errorMessage = 'Not Found';
    axios.put.mockRejectedValueOnce(new Error(errorMessage));

    await expect(taskService.updateTask(1, {})).rejects.toThrow(errorMessage);
  });

  test('deleteTask throws error when request fails', async () => {
    const errorMessage = 'Unauthorized';
    axios.delete.mockRejectedValueOnce(new Error(errorMessage));

    await expect(taskService.deleteTask(1)).rejects.toThrow(errorMessage);
  });
});
