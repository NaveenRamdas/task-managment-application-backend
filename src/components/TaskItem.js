import React, { useState } from "react";
import taskService from "../services/taskService";
import { FaCheckCircle, FaUndo, FaTrash } from "react-icons/fa";

const TaskItem = ({ task, refreshTasks, setIsLoading }) => {
  const token = localStorage.getItem("token");
  const [hover, setHover] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await taskService.deleteTask(token, task._id);
      await refreshTasks();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      setIsLoading(true);
      const newStatus = task.status === "pending" ? "completed" : "pending";
      await taskService.updateTask(token, task._id, { status: newStatus });
      await refreshTasks();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        ...styles.card,
        ...(hover ? styles.cardHover : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div>
        <h3 style={styles.title}>{task.title}</h3>
        <p style={styles.description}>{task.description}</p>
        <span
          style={{
            ...styles.status,
            backgroundColor:
              task.status === "completed" ? "#d1ffd1" : "#ffe0e0",
            color: task.status === "completed" ? "#2d7a2d" : "#aa3333",
          }}
        >
          {task.status}
        </span>
      </div>
      <div style={styles.buttons}>
        <button style={styles.deleteBtn} onClick={handleDelete}>
          <FaTrash style={{ marginRight: 6 }} /> Delete
        </button>
        <button style={styles.actionBtn} onClick={handleUpdateStatus}>
          {task.status === "pending" ? (
            <>
              <FaCheckCircle style={{ marginRight: 6 }} /> Mark Complete
            </>
          ) : (
            <>
              <FaUndo style={{ marginRight: 6 }} /> Mark Pending
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: "16px 20px",
    borderRadius: 10,
    border: "1px solid #eee",
    backgroundColor: "#fafafa",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "all 0.3s ease",
  },
  cardHover: {
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    transform: "translateY(-2px)",
    backgroundColor: "#fff",
  },
  title: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    color: "#333",
  },
  description: {
    margin: "5px 0",
    fontSize: 14,
    color: "#666",
  },
  status: {
    fontSize: 12,
    padding: "4px 10px",
    borderRadius: 6,
    display: "inline-block",
    textTransform: "capitalize",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 10,
  },
  actionBtn: {
    padding: "6px 12px",
    fontSize: 13,
    backgroundColor: "#4a90e2",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  deleteBtn: {
    padding: "6px 12px",
    fontSize: 13,
    backgroundColor: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
};

export default TaskItem;
