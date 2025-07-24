import Header from "./Header";
import Signin from "./signin";
import "./Login.css";

function Login(props) {
  return (
    <div className="login">
      <Header theme={props.theme} changeTheme={props.changeTheme} />
      <Signin />
    </div>
  );
}

export default Login;
