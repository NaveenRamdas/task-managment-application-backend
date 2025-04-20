import React, { useState, useEffect, useRef } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import taskService from "../services/taskService";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const isFirstRender = useRef(true);

 
  const refreshTasks = async () => {
    try {
      setIsLoading(true);
      const data = await taskService.getAllTasks(token);
      setTasks(data); // ✅ Set tasks directly here
    } catch (err) {
      console.error(err);
      setTasks([]); // Fallback
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setIsLoading(true);
      refreshTasks().finally(() => setIsLoading(false));
    }
  }, [token, navigate,]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.wrapper}>
      <header style={styles.topbar}>
        <div style={styles.logo}>TaskTracker</div>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </header>

      {isLoading ? (
        <div style={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <main style={styles.main}>
          <h2 style={styles.heading}>Welcome back!</h2>
          <div style={styles.grid}>
            <section style={styles.left}>
              <TaskForm
                setIsLoading={setIsLoading}
                refreshTasks={refreshTasks}
              />
            </section>

            {tasks.length > 0 && (
              <section style={styles.right}>
                <TaskList
                  tasks={tasks}
                  setIsLoading={setIsLoading}
                  setTasks={setTasks}
                  refreshTasks={refreshTasks}
                />
              </section>
            )}
          </div>
        </main>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f7f9fb",
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4a90e2",
    padding: "15px 30px",
    color: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  logo: {
    fontSize: 20,
    fontWeight: 600,
  },
  logoutButton: {
    backgroundColor: "#fff",
    color: "#4a90e2",
    border: "none",
    borderRadius: 6,
    padding: "8px 16px",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  loaderContainer: {
    width: "100%",
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    maxWidth: 1200,
    margin: "30px auto",
    padding: "0 20px",
  },
  heading: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 20,
    color: "#333",
  },
  grid: {
    display: "flex",
    gap: 30,
    alignItems: "flex-start",
  },
  left: {
    flex: "1 1 40%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  right: {
    flex: "1 1 60%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    maxHeight: "500px",
    overflowY: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "#c4c4c4 transparent",
  },
};

export default Dashboard;
