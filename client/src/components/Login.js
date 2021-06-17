import React from "react";
import axios from "axios";

const Login = ({ user }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "POST",
        url: "/auth/login",
        data: {
          username: username,
          password: password,
        },
        withCredentials: true,
      });
      localStorage.setItem("user", res.data);
      console.log(res.data);
      window.location.href = "/dashboard"
    } catch (err) {
      console.log(err);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <form
      onSubmit={(e) => {
        login(e);
      }}
      className="logsin"
    >
      <h1>😃 login.</h1>
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
      <button className="btn">login</button>
      <a href="/register">create new account</a>
    </form>
  );
};

export default Login;
