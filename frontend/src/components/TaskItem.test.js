import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TaskItem from './TaskItem';

describe('TaskItem', () => {
  const task = {
    id: 1,
    title: 'Test Task',
    description: 'This is a test task',
    due_date: '2022-12-31',
    status: 'Pending'
  };

  test('renders TaskItem component', () => {
    const { getByText } = render(<TaskItem task={task} />);
    const titleElement = getByText('Test Task');
    const descriptionElement = getByText('This is a test task');
    const dueDateElement = getByText('Due Date:');
    const statusElement = getByText('Status:');
    const updateButton = getByText('Update');
    const deleteButton = getByText('Delete');

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(dueDateElement).toBeInTheDocument();
    expect(statusElement).toBeInTheDocument();
    expect(updateButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  test('calls onUpdate when clicking the update button', () => {
    const onUpdate = jest.fn();
    const { getByText } = render(<TaskItem task={task} onUpdate={onUpdate} />);
    fireEvent.click(getByText('Update'));
    expect(onUpdate).toHaveBeenCalledWith(task);
  });

  test('calls onDelete when clicking the delete button and confirming', () => {
    const onDelete = jest.fn();
    const { getByText } = render(<TaskItem task={task} onDelete={onDelete} />);
    window.confirm = jest.fn(() => true); // Mock window.confirm to always return true
    fireEvent.click(getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  test('does not call onDelete when clicking the delete button and canceling', () => {
    const onDelete = jest.fn();
    const { getByText } = render(<TaskItem task={task} onDelete={onDelete} />);
    window.confirm = jest.fn(() => false); // Mock window.confirm to always return false
    fireEvent.click(getByText('Delete'));
    expect(onDelete).not.toHaveBeenCalled();
  });
});
