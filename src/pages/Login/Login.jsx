import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/layout/Header";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

function Login({ theme, changeTheme }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    
    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        { username, password },
        { withCredentials: true }
      );
      
      if (res.data.user) {
        navigate('/');
      } else {
        alert("Invalid username or password");
        setPassword("");
      }
    } catch (error) {
      alert("Login failed. Please try again.");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Check if username exists
      const checkRes = await axios.post("http://localhost:5000/check", { username });
      
      if (checkRes.data.user) {
        alert("Username already taken. Please choose a different one.");
        setLoading(false);
        return;
      }

      // Register user
      await axios.post("http://localhost:5000/register", { username, password });
      
      alert("Registration successful! You can now log in.");
      setIsRegisterMode(false);
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="login-container">
      <Header theme={theme} changeTheme={changeTheme} />
      
      <main className="login-main">
        <div className="login-card">
          <h2 className="login-title">
            {isRegisterMode ? 'Create Account' : 'Welcome Back'}
          </h2>
          
          <form className="login-form" onSubmit={isRegisterMode ? handleRegister : handleLogin}>
            <div className="form-group">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                {isRegisterMode ? 'Create Password' : 'Password'}
              </label>
              <input
                id="password"
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>

            {isRegisterMode && (
              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  disabled={loading}
                />
              </div>
            )}

            <div className="form-actions">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                disabled={loading}
              >
                {isRegisterMode ? 'Create Account' : 'Sign In'}
              </Button>

              {isRegisterMode && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={toggleMode}
                  disabled={loading}
                >
                  Back to Login
                </Button>
              )}
            </div>
          </form>

          {!isRegisterMode && (
            <div className="register-toggle">
              <span>Don't have an account? </span>
              <span className="register-link" onClick={toggleMode}>
                Sign up here
              </span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Login;