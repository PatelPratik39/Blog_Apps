import React from "react";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext"; 

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        // to get credentials from cookie, need to use credentials
        credentials: "include"
      });
      console.log(response);
      if (response.ok) {
        alert("Login Successfull!!!");
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
          setRedirect(true);
        });
      } else {
        alert("What did you do??? , Login Failed!!");
      }
    } catch (error) {
      console.log(error);
      alert("Something Wrong occured!, Please Try Again!!");
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div>
        <form className="login" onSubmit={login}>
          <h1> Login</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Login</button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
