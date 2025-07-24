import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/login";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("preferred-theme") === "dark";
  });

  useEffect(() => {
    const mode = theme ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("preferred-theme", mode);
  }, [theme]);

  function changeTheme() {
    setTheme((prev) => !prev);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home theme={theme} changeTheme={changeTheme} />} />
        <Route path="/login" element={<Login theme={theme} changeTheme={changeTheme} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
