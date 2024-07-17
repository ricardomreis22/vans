import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../api";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Login() {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [loginType, setLoginType] = useState("login");

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || "/host";

  // handle every key press on the input from mail and password
  function handleChange(e) {
    const { name, value } = e.target;

    // update our Login object
    setUserCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSignUp(e) {
    e.preventDefault();
    setError("");

    createUserWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/", { replace: true });
      })
      .catch((error) => {
        setError(error.message);

        // ..
      });
  }

  function handleLogin(e) {
    e.preventDefault();
    setError("");
    signInWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        navigate("/host/vans");
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function handlePasswordReset() {
    const email = prompt("Enter email");
    sendPasswordResetEmail(auth, email);
    alert("Email sent!");
  }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setStatus("submitting");
  //   loginUser(loginFormData)
  //     .then((data) => {
  //       setError(null);
  //       localStorage.setItem("loggedin", true);
  //       navigate(from, { replace: true });
  //     })
  //     .catch((err) => {
  //       setError(err);
  //     })
  //     .finally(() => {
  //       setStatus("idle");
  //     });
  // }

  return (
    <div className="login-container">
      {location.state?.message && (
        <h3 className="login-error">{location.state.message}</h3>
      )}
      <h1>Sign in to your account</h1>
      {error?.message && <h3 className="login-error">{error.message}</h3>}
      <div>
        <button
          className={`${loginType === "login" ? "selected" : ""}`}
          onClick={() => setLoginType("login")}
        >
          Login
        </button>
        <button
          className={`${loginType === "login" ? "selected" : ""}`}
          onClick={() => setLoginType("signup")}
        >
          Signup
        </button>
      </div>
      <form className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={userCredentials.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={userCredentials.password}
        />
        {loginType === "login" ? (
          <button
            disabled={status === "submitting"}
            onClick={(e) => {
              handleLogin(e);
            }}
          >
            Login
          </button>
        ) : (
          <button
            onClick={(e) => {
              handleSignUp(e);
            }}
          >
            Sign Up
          </button>
        )}
        {error && <div className="login-error">{error}</div>}

        <p onClick={handlePasswordReset}> Forgot password? </p>
      </form>
    </div>
  );
}
