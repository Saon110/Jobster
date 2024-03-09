import React, { useState } from "react";
import CompanyFinder from "../apis/CompanyFinder";
import { useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "../css/login.css"; // Add a CSS file for styling

const LoginPage = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupContact, setSignupContact] = useState("");
  const [signupBirthdate, setSignupBirthdate] = useState("");

  const navigate = useNavigate();

  const handleLoginEmailChange = (event) => {
    setLoginEmail(event.target.value);
  };

  const handleLoginPasswordChange = (event) => {
    setLoginPassword(event.target.value);
  };

  const handleSignupNameChange = (event) => {
    setSignupName(event.target.value);
  };

  const handleSignupEmailChange = (event) => {
    setSignupEmail(event.target.value);
  };

  const handleSignupPasswordChange = (event) => {
    setSignupPassword(event.target.value);
  };

  const handleSignupContactChange = (event) => {
    setSignupContact(event.target.value);
  };

  const handleSignupBirthdateChange = (event) => {
    setSignupBirthdate(event.target.value);
  };


  const isSignupFormValid = () => {
    return (
      signupName.trim() !== "" &&
      signupEmail.trim() !== "" &&
      signupContact.trim() !== "" &&
      signupPassword.trim() !== "" &&
      signupBirthdate.trim() !== "" &&
      isValidEmail(signupEmail)
    );
  };

  const isValidEmail = (email) => {
    // You can use a regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await CompanyFinder.post("/login", {
        email: loginEmail,
        password: loginPassword,
      });

      if (response.status === 200 && response.data) {
        localStorage.setItem("token", response.data);
        console.log("Login successful!");
        navigate("/User/home");
      } else if (response === "not ok"){
        console.log("Login failed!");
        alert ("login failed try again");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    console.log (signupBirthdate);


    if (!isSignupFormValid()) {
      alert("Please fill in all the fields with valid information.");
      return;
    }

    


    try {
      const response = await CompanyFinder.post("/signup", {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        contact_no : signupContact,
        birth_date : signupBirthdate
      });

      if (response.status === 201) {
        console.log("Signup successful!");
        alert("Signup Successful");

        window.location.reload();

      } else {
        console.log("Signup failed!");
        alert("Email already registered. Please use a different email.");

      //  window.location.reload();
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="section">
      <div className="container">
      
      <div className="row full-height justify-content-center align-items-center">
          
          <div className="col-12 text-center align-self-center py-5">
            <Link to="/CompanyLogin" className="employer-link mb-4 text-left" style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
              For Employers
            </Link>
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
          
              <h6 className="mb-0 pb-3">
             

                <span>Log In </span>
                <span>Sign Up</span>
              </h6>
              <input
                className="checkbox"
                type="checkbox"
                id="reg-log"
                name="reg-log"
              />
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Log In
                        
            </h4>
                        <div className="form-group">
                          <input
                            type="email"
                            name="logemail"
                            className="form-style"
                            placeholder="Your Email"
                            id="logemail"
                            autoComplete="off"
                            value={loginEmail}
                            onChange={handleLoginEmailChange}
                          />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            className="form-style"
                            placeholder="Your Password"
                            id="logpass"
                            autoComplete="off"
                            value={loginPassword}
                            onChange={handleLoginPasswordChange}
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <button
                          type="submit"
                          className="btn mt-4"
                          onClick={handleLoginSubmit}
                        >
                          Submit
                        </button>
                        <p className="mb-0 mt-4 text-center">
                          <a href="#0" className="link">
                            Forgot your password?
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        <div className="form-group">
                          <input
                            type="text"
                            name="logname"
                            className="form-style"
                            placeholder="Your Full Name"
                            id="logname"
                            autoComplete="off"
                            value={signupName}
                            onChange={handleSignupNameChange}
                          />
                          <i className="input-icon uil uil-user"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="email"
                            name="logemail"
                            className="form-style"
                            placeholder="Your Email"
                            id="logemail"
                            autoComplete="off"
                            value={signupEmail}
                            onChange={handleSignupEmailChange}
                          />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="contact_no"
                            name="logecontact"
                            className="form-style"
                            placeholder="Your Contact No"
                            id="logecontact"
                            autoComplete="off"
                            value={signupContact}
                            onChange={handleSignupContactChange}
                          />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-2">
                        <input
                           type="date"
                          name="birthdate"
                          className="form-style"
                          placeholder={signupBirthdate ? "Birthdate" : "Your Birthdate"}
                          id="birthdate"
                          autoComplete="off"
                          value={signupBirthdate}
                          onChange={handleSignupBirthdateChange}
                        />
                        <i className="input-icon uil uil-calendar"></i>
                      </div>


                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            className="form-style"
                            placeholder="Your Password"
                            id="logpass"
                            autoComplete="off"
                            value={signupPassword}
                            onChange={handleSignupPasswordChange}
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <button
                          type="submit"
                          className="btn mt-4"
                          onClick={handleSignupSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
