import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import taskService from "../services/taskService";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (!username || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
  
   
  
    // Password length
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
  
    // Confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      const token = await taskService.register(username, password);
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };
  

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Create Account</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>Username</label>
            <input
              type="text"
              id="username"
              placeholder="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.primaryButton}>Sign Up</button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerLine}></span>
          <span style={styles.dividerText}>OR</span>
          <span style={styles.dividerLine}></span>
        </div>

        <button onClick={handleGoogleLogin} style={styles.googleButton}>
          <img
            src={require("../Assets/Google_Icons-09-512.webp")}
            alt="Google"
            style={{ width: 30, marginRight: 10 }}
          />
          Sign Up with Google
        </button>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f6fa",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  heading: {
    marginBottom: 30,
    fontSize: 28,
    fontWeight: 600,
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
  },
  formGroup: {
    textAlign: "left",
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    color: "#555",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  },
  primaryButton: {
    padding: "12px",
    backgroundColor: "#4a90e2",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    cursor: "pointer",
    marginTop: 10,
    transition: "background-color 0.3s",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    margin: "25px 0",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    margin: "0 10px",
    color: "#aaa",
    fontSize: 13,
  },
  googleButton: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: 8,
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
    color: "black",
    width: "100%",
    boxSizing: "border-box",
  },
  footerText: {
    marginTop: 25,
    fontSize: 14,
    color: "#777",
  },
  link: {
    color: "#4a90e2",
    textDecoration: "none",
    fontWeight: 500,
  },
};

export default Register;
