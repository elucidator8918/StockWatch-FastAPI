import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "./assets/image1.png";
// import Login from '../pages/Login';
// import MyContext from './MyContext';

export default function Navbar2() {
  const navigate = useNavigate();

  const [logged, setLogged] = useState(false);

  // const[bool,setBool]=useState(false);
  // const handleLogIn = () =>{
  //     // setLogged(true)
  //     navigate("/login")
  // }

  // const handleSignIn = () =>{
  //     // setLogged(true)
  //     navigate("/signup")
  // }

  const handleLogOut = () => {
    setLogged(false);
    navigate("/");
  };

  return (
    <div className="flex flex-row static ">
      <header className="absolute inset-x-0 top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-800">
        <nav
          className="flex items-center justify-between p-2 mb-1 lg:px-8 "
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src={image} alt="" />
            </a>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            <a
              href="#"
              className="text-md font-semibold leading-6 text-gray-200 hover:font-extrabold hover:shadow-xl transition-all ease-in duration-100 p-2 rounded-lg "
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </a>

            {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-200 hover:font-extrabold hover:shadow-xl transition-all ease-in duration-100 p-2 rounded-lg">Find Jobs</a>*/}
          </div>

          <div className="flex flex-1 justify-end">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-200 mr-2 p-2 hover:bg-violet-500 rounded-md transition-all duration-500 ease-in-out border-2 border-violet-500"
              onClick={() => {
                navigate("/preferences");
              }}
            >
              {" "}
              PREFERENCES <span aria-hidden="true"></span>
            </a>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-200 p-2 hover:bg-violet-500 rounded-md transition-all duration-500 ease-in-out border-2  border-violet-500"
              onClick={handleLogOut}
            >
              Log Out <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>
    </div>
  );
}
