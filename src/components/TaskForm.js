import React, { useState } from 'react';
import taskService from '../services/taskService';

const TaskForm = ({ setIsLoading, refreshTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Task title is required');
      return;
    }

    try {
      setIsLoading(true);
      await taskService.createTask(token, {
        title,
        description,
        status: 'pending',
      });
      setTitle('');
      setDescription('');
      await refreshTasks();// ✅ refresh task list after creation
    } catch (error) {
      console.error(error);
      alert('Failed to create task');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Create New Task</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>Description</label>
          <textarea
            id="description"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />
        </div>
        <button type="submit" style={styles.button}>Add Task</button>
      </form>
    </div>
  );
};

const styles = {
  card: {
    padding: 20,
    // backgroundColor: '#fff',
    borderRadius: 10,
    // boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
  },
  heading: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 600,
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#555',
  },
  input: {
    padding: '10px 12px',
    fontSize: 14,
    borderRadius: 8,
    border: '1px solid #ccc',
    outline: 'none',
    boxSizing: 'border-box',
  },
  textarea: {
    padding: '10px 12px',
    fontSize: 14,
    borderRadius: 8,
    border: '1px solid #ccc',
    outline: 'none',
    minHeight: 80,
    resize: 'vertical',
    boxSizing: 'border-box',
  },
  button: {
    padding: '12px',
    backgroundColor: '#4a90e2',
    color: '#fff',
    fontSize: 15,
    fontWeight: 500,
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default TaskForm;
