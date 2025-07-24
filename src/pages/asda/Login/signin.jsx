import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Signin() {
  const [mode, setMode] = useState("login");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strength, setStrength] = useState("weak");
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("preferred-theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const handleThemeToggle = (e) => {
    const isDark = e.target.checked;
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("preferred-theme", isDark ? "dark" : "light");
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setUserName("");
    setPassword("");
    setConfirmPassword("");
    setStrength("weak");
  };

  const evaluateStrength = (pwd) => {
    if (pwd.length > 10) setStrength("strong");
    else if (pwd.length >= 6) setStrength("medium");
    else setStrength("weak");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) return alert("Please fill all fields.");
    try {
      const res = await axios.post("http://localhost:5000/login", { username, password }, { withCredentials: true });
      if (res.data.user) navigate("/");
      else alert("Invalid credentials");
    } catch {
      alert("Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) return alert("Please fill all fields.");
    if (password !== confirmPassword) return alert("Passwords do not match.");
    if (password.length < 6) return alert("Password must be at least 6 characters.");
    try {
      const exists = await axios.post("http://localhost:5000/check", { username });
      if (exists.data.user) return alert("Username already taken.");
      await axios.post("http://localhost:5000/register", { username, password });
      alert("Registered successfully!");
      toggleMode();
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="container">
      {/* Theme Toggle */}
      <div className="theme-toggle">
        <label className="switch">
          <input
            type="checkbox"
            onChange={handleThemeToggle}
            defaultChecked={localStorage.getItem("preferred-theme") === "dark"}
          />
          <span className="slider"></span>
        </label>
      </div>

      {/* Login Form */}
      <div className={`form-container ${mode === "login" ? "" : "hidden"}`}>
        <form className="form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input type="text" placeholder="Username" value={username} onChange={e => setUserName(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>

      {/* Register Form */}
      <div className={`form-container ${mode === "register" ? "" : "hidden"}`}>
        <form className="form" onSubmit={handleRegister}>
          <h2>Register</h2>
          <input type="text" placeholder="Username" value={username} onChange={e => setUserName(e.target.value)} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              evaluateStrength(e.target.value);
            }}
          />
          <div id="strength-bar">
            <div id="strength-fill" style={{
              width: strength === "strong" ? "100%" : strength === "medium" ? "66%" : "33%",
              background: strength === "strong" ? "var(--strength-strong)" : strength === "medium" ? "var(--strength-medium)" : "var(--strength-weak)"
            }}></div>
          </div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
      </div>

      {/* Info Panel */}
      <div className="info-panel">
        <div className="info-content">
          <h2>{mode === "login" ? "New here?" : "Already a user?"}</h2>
          <p>{mode === "login" ? "Create an account to get started." : "Log in to continue."}</p>
          <button onClick={toggleMode}>{mode === "login" ? "Register" : "Lyogin"}</button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
