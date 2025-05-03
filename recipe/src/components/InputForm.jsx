

import React, { useState } from "react";
import axios from "axios";

export default function InputForm({ setIsOpen }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isSignUp ? "signUp" : "login";
    const userData = isSignUp ? { name, email, password } : { email, password };

    try {
      const res = await axios.post(
        `http://localhost:5000/${endpoint}`,
        userData
      );
      // ✅ Store token and user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.dispatchEvent(new Event("login")); // ✅ Trigger login event

      alert(isSignUp ? "Registered Successfully!" : "Login Successfully!");
      setIsOpen(); // Close modal/form
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleOnSubmit}>
        {/* Dynamic Form Title */}
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>

        {/* Name field only in Sign Up */}
        {isSignUp && (
          <div className="form-control">
            <label>Name</label>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        {/* Email field */}
        <div className="form-control">
          <label>Email</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password field */}
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        {/* change button using ternary operator*/}
        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>

        {/* Error message */}
        {error && <h6 className="error">{error}</h6>}

        {/* Toggle Login/SignUp */}
        <p
          onClick={() => setIsSignUp((prev) => !prev)}
          style={{ cursor: "pointer", marginTop: "10px", color: "blue" }}
        >
          {/* change link text*/}
          {isSignUp ? (
            <p>
              Don't have an account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Click here</span>
            </p>
          )}
        </p>
      </form>
    </div>
  );
}
