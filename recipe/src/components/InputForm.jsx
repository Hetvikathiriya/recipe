import React, { useState } from "react";

export default function InputForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form className="form" onSubmit={handleOnSubmit}>
        <div className="form-control">
          <label>Email</label>
          <input
            type="email"
            className="input"
            onChange={() => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            className="input"
            onChange={() => setPassword(e.target.value)}
            required
          ></input>
        </div>
        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
        <p onClick={() => setIsSignUp((pre) => !pre)}>
          {isSignUp ? "Already have an account" : "Create new account"}
        </p>
      </form>
    </>
  );
}

