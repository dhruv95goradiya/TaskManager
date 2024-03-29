import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import TaskList from './TaskList';
import taskService from '../services/taskService';

jest.mock('../services/taskService'); // Mock taskService module

describe('TaskList', () => {
    test('calls handleTaskDeleted when clicking delete button', async () => {
      const mockTasks = [
        { id: 1, title: 'Task 1', description: 'Description 1' },
        { id: 2, title: 'Task 2', description: 'Description 2' }
      ];
      taskService.getAllTasks.mockResolvedValueOnce({ data: mockTasks });
  
      const handleTaskDeleted = jest.fn();
      const { getAllByText } = render(<TaskList />);
  
      // Wait for tasks to be loaded
      await getAllByText(/Task/);
  
      // Click the delete button
      const deleteButtons = getAllByText('Delete');
      fireEvent.click(deleteButtons[0]); // Click the first delete button
  
      // Check if handleTaskDeleted is called
      expect(handleTaskDeleted).toHaveBeenCalled();
    });
  });
