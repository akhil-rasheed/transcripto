import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "./navbar.css";

export default function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <nav className="navbar bg-black text-white lg:w-full rounded-b-full w-screen">
      <div className="nav-container flex flex-row w-full justify-center items-center h-36">
        <div className="w-full flex flex-row items-center justify-center">
          <img src="logo.png" className="h-20" alt="transcripto" />
        </div>
      </div>
    </nav>
  );
}
