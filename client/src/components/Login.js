import React from "react";
import { GlobalContext } from "./context/GlobalContext";
import { useHistory } from "react-router";

const Login = () => {
  const [register, setRegister] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const {login, registerUser} = React.useContext(GlobalContext);

  async function submitHandler(e) {
      e.preventDefault();
      setError("")
      const res = register ? await registerUser(username, password) : await login(username, password);
      console.log(res);
      res.status === "failed" ? register ? setError("username already exist") :setError("incorrect username or password") : window.location.href = "/";
  }

  return (
    <form
      onSubmit={e => submitHandler(e)}
      className="logsin"
    >
      <h1>{register ? "👋 signup" :"😃 login."}</h1>
      {error && <div className="alert">{error}</div>}
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
