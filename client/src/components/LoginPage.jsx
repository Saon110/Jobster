import React, { useState } from "react";
import CompanyFinder from "../apis/CompanyFinder";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate () ;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await CompanyFinder.post("/login", {
        email,
        password
        
      });
      console.log (response.data);
      

      if (response.data === "ok") {

        // Handle successful login
        console.log("Login successful!");
        navigate("/User/home");
      } else {
        // Handle login error
        console.log("Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        {/* Email input */}
        <div className="form-outline mb-4">
          <input
            type="email"
            id="form2Example1"
            className="form-control"
            value={email}
            onChange={handleEmailChange}
          />
          <label className="form-label" htmlFor="form2Example1">
            Email address
          </label>
        </div>

        {/* Password input */}
        <div className="form-outline mb-4">
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            value={password}
            onChange={handlePasswordChange}
          />
          <label className="form-label" htmlFor="form2Example2">
            Password
          </label>
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
