import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
//import "./navbar.css";
//import dsc from "../../"
export default function Navbar() {
  const [click, setClick] = useState(false);
  const { user, name } = useContext(AuthContext);

  console.log(name + " receieved at navbar");
  const handleClick = () => setClick(!click);
  return (
    <div className="bg-teal-400 mt-0 rounded-t-full">
      <nav className="bg-black text-white rounded-b-full h-20 lg:h-24">
        <div className="nav-container flex flex-row justify-evenly items-start h-full">
          <div className="flex flex-1 flex-row items-center justify-center">
            <img src="logo.png" className="h-16 lg:h-20" alt="transcripto" />
          </div>
          <div className="flex mr-8 mt-4  lg:mr-16 mt-6">
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              class=" focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center "
              type="button"
            >
              <img
                class="w-10 h-10 rounded-full"
                src="userIcon.png"
                alt="Rounded avatar"
              />
              <svg
                class="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <div
              id="dropdown"
              class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <Link
                    to="/dashboard"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link
                    to="/login"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {" "}
                    Sign out? <br />
                    Bye {name}!
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
