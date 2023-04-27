import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";
import logo from "./logo.svg";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const navigate = useNavigate();
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };
  const SubmitHandler = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then(async (userCredential) => {
        console.log(userCredential);
        // const docRef = doc(database, "users", `${enteredEmail}`);
        // const docSnap = await getDoc(docRef);

        // if (docSnap.exists()) {
        //   console.log("Document data:", docSnap.data());
        // } else {
        //   // docSnap.data() will be undefined in this case
        //   console.log("No such document!");
        // }
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
    const userData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    console.log(userData);

    setEnteredEmail("");
    setEnteredPassword("");
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
            <input type="submit" value="Login" className="btn solid" />
            {/* <p className="social-text">Or Sign in with social platforms</p>
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
            </div> */}
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
            <Link to="/register">
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
