import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/layout/Header";
import Dashboard from "../../components/dashboard/Dashboard";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

function Home({ theme, changeTheme }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="app">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          <LoadingSpinner size="xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header theme={theme} changeTheme={changeTheme} user={user} />
      <main className="main-content">
        <div className="container">
          <Dashboard user={user} />
        </div>
      </main>
    </div>
  );
}

export default Home;