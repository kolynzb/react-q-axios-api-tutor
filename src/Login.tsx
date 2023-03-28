import "./login.css";
import { Link } from "react-router-dom";

import { useState } from "react";
import { login } from "./auth";

type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // In your login and logout components, use the functions from auth.js to log in and log out the user:
  const handleSubmit = (e: any) => {
    e.preventDefault();
    login(email, password);
  };
  
  return (
    <div className="wrapper">
      <div className="logo">
        <img
          src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png"
          alt=""
        />
      </div>
      <div className="text-center mt-4 name">Twitter</div>
      <form className="p-3 mt-3" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="Email"
            id="Email"
            placeholder="Email"
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input
            type="password"
            name="password"
            id="pwd"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button className="btn mt-3">Login</button>
      </form>
      <div className="text-center fs-6">
        <a href="#">Forget password?</a> or <Link to="/register">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
