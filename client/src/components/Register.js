import React from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/auth/register",
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
        register(e);
      }}
      className="logsin"
    >
      <h1>👋 singup.</h1>
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
      <button className="btn">create account</button>
      <p>already have an account? <a href="/login">login</a></p>
    </form>
  );
};

export default Register;
