import React from "react";
import { GlobalContext } from "./context/GlobalContext";
import { useHistory } from "react-router";

const Login = () => {
  const [register, setRegister] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const {login, registerUser} = React.useContext(GlobalContext);
  const history = useHistory();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        register ? registerUser(username, password) : login(username, password);
        history.push("/");
      }}
      className="logsin"
    >
      <h1>{register ? "👋 signup" :"😃 login."}</h1>
      <label>Username</label>
      <div className="form-control">
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn">{register ? "sign up": "login"}</button>
      <a
        onClick={() => {
          setRegister(!register);
        }}
      >
        {register ? "login" : "create new account"}
      </a>
    </form>
  );
};

export default Login;
