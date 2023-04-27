import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import "./navbar.css";

export default function Navbar() {
  const [click, setClick] = useState(false);
  const { user, name } = useContext(AuthContext);

  console.log(name + " receieved at navbar");
  const handleClick = () => setClick(!click);
  return (
<<<<<<< HEAD
    <div className="bg-white">
      <nav className="navbar bg-black text-white w-full rounded-b-full">
        <div className="nav-container flex flex-row w-full justify-center items-center h-36">
          <div className="w-full flex flex-row items-center justify-center">
            <img src="logo.png" className="h-20" alt="transcripto" />
=======
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
              {user ? (
                <Link
                  to="/login"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Logout
                </Link>
              ) : (
                <Link
                  to="/login"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
>>>>>>> main
          </div>
        </div>
      </nav>
    </div>
  );
}
