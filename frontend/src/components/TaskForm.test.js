import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import TaskForm from './TaskForm';
import taskService from '../services/taskService';

jest.mock('../services/taskService');

describe('TaskForm', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocked functions before each test
  });

  test('renders TaskForm component', () => {
    const { getByPlaceholderText, getByText } = render(<TaskForm />);
    expect(getByPlaceholderText('Title')).toBeInTheDocument();
    expect(getByPlaceholderText('Description')).toBeInTheDocument();
    expect(getByPlaceholderText('Due Date')).toBeInTheDocument();
    expect(getByPlaceholderText('Status')).toBeInTheDocument();
    expect(getByText('Create Task')).toBeInTheDocument();
  });

  test('calls onTaskCreated when submitting the form for creating a task', async () => {
    const onTaskCreated = jest.fn();
    const { getByPlaceholderText, getByText } = render(<TaskForm onTaskCreated={onTaskCreated} />);
    
    fireEvent.change(getByPlaceholderText('Title'), { target: { value: 'Test Task' } });
    fireEvent.change(getByPlaceholderText('Description'), { target: { value: 'This is a test task' } });
    fireEvent.change(getByPlaceholderText('Due Date'), { target: { value: '2022-12-31' } });
    fireEvent.change(getByPlaceholderText('Status'), { target: { value: 'Pending' } });
    fireEvent.click(getByText('Create Task'));
  
    await waitFor(() => {
      expect(onTaskCreated).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Test Task',
        description: 'This is a test task',
        due_date: '2022-12-31',
        status: 'Pending'
      }));
    });
  });  

  test('calls onTaskUpdated when submitting the form for updating a task', async () => {
    const onTaskUpdated = jest.fn();
    const task = { id: 1, title: 'Existing Task', description: 'This is an existing task', due_date: '2022-12-31', status: 'Pending' };
    const { getByPlaceholderText, getByText } = render(<TaskForm task={task} onTaskUpdated={onTaskUpdated} isEdit={true} />);
  
    fireEvent.change(getByPlaceholderText('Title'), { target: { value: 'Updated Task' } });
    fireEvent.change(getByPlaceholderText('Description'), { target: { value: 'This is an updated task' } });
    fireEvent.change(getByPlaceholderText('Due Date'), { target: { value: '2022-12-30' } });
    fireEvent.change(getByPlaceholderText('Status'), { target: { value: 'Completed' } });
    fireEvent.click(getByText('Update Task'));
  
    await waitFor(() => {
      expect(onTaskUpdated).toHaveBeenCalledWith(expect.objectContaining({
        id: 1,
        title: 'Updated Task',
        description: 'This is an updated task',
        due_date: '2022-12-30',
        status: 'Completed'
      }));
    });
  });

  test('calls onCancel when clicking the cancel button in edit mode', () => {
    const onCancel = jest.fn();
    const task = { id: 1, title: 'Existing Task', description: 'This is an existing task', due_date: '2022-12-31', status: 'Pending' };
    const { getByText } = render(<TaskForm task={task} onCancel={onCancel} isEdit={true} />);
    
    fireEvent.click(getByText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
  });
  

});
