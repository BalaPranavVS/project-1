import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Header({ theme, changeTheme }) {
  const navigate = useNavigate();

  async function OnLogOut() {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      await axios.get("http://localhost:5000/logout", { withCredentials: true });
      navigate("/login");
    }
  }

  return (
    <header className="app-header">
      <div className="header-left" onClick={() => navigate("/")}>
        <img
          src="https://img.studyclap.com/img/institute/logo/6764d0eb9d-kct-coimbatore.png"
          alt="college logo"
          className="Header-Logo"
        />
        <h1 className="college-name">Kumaraguru College of Technology</h1>
      </div>

      <div className="header-right">
        <button className="logout-btn" onClick={OnLogOut}>Log Out</button>

        <label className="theme-toggle">
          <input
            type="checkbox"
            onChange={changeTheme}
            checked={theme}
          />
          <span className="slider"></span>
        </label>
      </div>
    </header>
  );
}

export default Header;
