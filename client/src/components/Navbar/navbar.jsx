import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";
import { AuthContext } from "../Context/AuthContext";
//import AuthDetails from "./AuthDetails";
import "./navbar.css";

export default function Navbar() {
  const [click, setClick] = useState(false);
  const { user, name } = useContext(AuthContext);
  console.log(name + " receieved at navbar");
  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            Transcripto
          </Link>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/register"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/login"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Login
              </Link>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}
