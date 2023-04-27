import React from "react";
import "./Style.css";
import register from "./register.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../firebase";
import { database } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
function SignUp() {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then(() => {
        setDoc(doc(database, "users", `${enteredEmail}`), {
          username: enteredName,
        });
        // addDoc(collection(database, "users"), {
        //   email: enteredEmail,

        // });
      })
      .catch((error) => {
        console.log(error);
      });
    const userData = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
    };

    console.log(userData);

    setEnteredName("");
    setEnteredEmail("");
    setEnteredPassword("");
  };
  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={SubmitHandler}>
            <h2 className="title">Sign Up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                value={enteredName}
                onChange={nameChangeHandler}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                value={enteredEmail}
                onChange={emailChangeHandler}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={enteredPassword}
                onChange={passwordChangeHandler}
                required
              />
            </div>
            <input type="submit" value="Sign Up" className="btn solid" />
            {/* <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div> */}
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <Link to="/login">
              <button className="btn transparent" id="sign-up-btn">
                Log In
              </button>
            </Link>
          </div>
          <img src={register} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
