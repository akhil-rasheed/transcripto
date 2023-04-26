import React from "react";
import { Link } from "react-router-dom";
import "./Style.css";
import logo2 from "./log2.svg";
import { useRef, useState } from "react";
const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

function Login() {
  const [formInputValidity, setformInputValidity] = useState({
    email: true,
    password: true,
  });
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const SubmitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enterdPassword = passwordInputRef.current.value;

    const enteredEmailIsValid = !isEmpty(enteredEmail);
    const enteredPasswordIsValid = isFiveChars(enterdPassword);

    setformInputValidity({
      email: enteredEmailIsValid,
      password: enteredPasswordIsValid,
    });

    const formIsValid = enteredEmailIsValid && enteredPasswordIsValid;
    if (!formIsValid) {
      //return
    }
  };
  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={SubmitHandler}>
            <h2 className="title">Log in</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                ref={emailInputRef}
                required
              />
              {!formInputValidity.email && <p>Enter the valid Email</p>}
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                ref={passwordInputRef}
                required
              />
              {!formInputValidity.password && <p>Enter the valid Password</p>}
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i class="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <Link to="/signup">
              <button className="btn transparent" id="sign-up-btn">
                Sign up
              </button>
            </Link>
          </div>
          <img src={logo} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
