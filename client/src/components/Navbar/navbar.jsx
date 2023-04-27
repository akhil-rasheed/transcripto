import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
export default function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <div className="bg-white">
      <nav className="navbar bg-black text-white w-full rounded-b-full">
        <div className="nav-container flex flex-row w-full justify-center items-center h-32">
          <div className="w-full flex flex-row items-center justify-center">
            <img src="logo.png" class="h-20" />
          </div>
          {/* <ul
            className={
              click
                ? "nav-menu active flex flex-row w-60"
                : "nav-menu flex flex-row w-60"
            }
          >
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
          </ul> */}
          {/* <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div> */}
        </div>
      </nav>
    </div>
  );
}
