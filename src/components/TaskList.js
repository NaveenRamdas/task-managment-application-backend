import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, setIsLoading, refreshTasks }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Tasks</h2>
      {Array.isArray(tasks) && tasks.length === 0 ? (
        <p style={styles.empty}>No tasks yet. Add one above!</p>
      ) : (
        <ul style={styles.list}>
          {tasks.map((task) => (
            <li key={task._id} style={styles.listItem}>
              <TaskItem
                task={task}
                refreshTasks={refreshTasks} // ✅ just call it in TaskItem
                setIsLoading={setIsLoading}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


const styles = {
  container: {
    padding: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    // boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  },
  heading: {
    fontSize: 20,
    fontWeight: 600,
    color: '#333',
    marginBottom: 15,
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  listItem: {
    padding: 0,
  },
  empty: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
  },
};

export default TaskList;
