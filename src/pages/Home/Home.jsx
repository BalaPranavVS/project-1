import "./Home.css";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./components/dashbord";
import Dropdown from "./components/dropdown";
import Mark from "./components/mark";

const options = ['React', 'Vue', 'Angular'];

function Home({ theme, changeTheme }) {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="home">
      <Header theme={theme} changeTheme={changeTheme} />
      <main className="home-main">
        <Dashboard user={user} />
      </main>
      <Dropdown options={options} value={selectedOption} onChange={handleChange}/>
      <div className="Assesments">
        {selectedOption ? <Mark selectedRoadMap={selectedOption}/>:null} 
      </div>
    </div>
  );
}

export default Home;

