import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../firebaseConfig";
import { signOut } from "firebase/auth";
import logo from "./images/juet_logo.png";

export default function Navbar({
  setSearchTerm,
  searchTerm,
  data,
  setSearchResults,
}) {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const isLoginPage =
    window.location.pathname.includes("signin") ||
    window.location.pathname.includes("register");
  if (isLoginPage) {
    return null;
  }
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);

    const results = data.filter((item) =>
      item.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(results);
  };
  return (
    <div className="fixed-top border shadow-md backdrop-blur-[100px] bg-[#FFFFFF4D] xsm:h-[60px] justify-center items-center ">
      <nav className=" flex  items-center h-full  mr-0  ">
        <div className="flex flex-col h-full items-center xsm:flex-row p-0 w-[70%] md:w-[55%] lg:w-[70%] xsm:justify-between ">
          <div className="flex">
            <Link className="nav-link ml-0 p-1 " to="/home">
              <button className="sm:text-[22px] text-[18px] text-[#190e7b] font-bold xsm:ml-6 sm:ml-2 mt-2 sm:mt-0 ">
                All <br className="hidden sm:hidden xsm:block" />
                <div className="-mt-2  xsm:block md2:inline-flex inline-flex ">
                  {" "}
                  Products
                </div>
              </button>
            </Link>
          </div>
          <div className=" items-center relative xsm:w-[70%]  h-full mr-auto sm:ml-auto ml-2 xsm:ml-1 sm:mr-0">
            <input
              placeholder="Search here"
              className=" w-full border-[1px] sm:h-[35px] h-8 border-[#190e7b]   p-[10px] xsm:mt-[15px] mb-[10px]  rounded-[10px]"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <div className="absolute right-4 xsm:top-6 top-2 "><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-search sm:w-5 sm:h-5 w-4 h-4" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/> </svg></div>
          </div>
        </div>
        <div className="w-[30%] md:w-[45%] lg:w-[35%] items-center ">
          <div className="flex  justify-end items-center">
            {user ? (
              <span className="pe-4 text-[20px] hidden md:block text-[#190e7b] font-black  ">
                {user.displayName || user.email}
              </span>
            ) : (
              <></>
            )}
            <button
              className="bg-[#190e7b] sm:text-[16px] text-[12px] sm:px-4 sm:w-20 mt-[30px] xsm:mt-0 sm:py-2 px-3 py-2 xsm:px-2 xsm:py-[7px] mr-auto sm:mr-2 xsm:mr-6 text-center ml-auto md:ml-0 md:mr-4 rounded-[10px] text-white font-medium sm:me-3  "
              onClick={() => {
                if (user) {
                  signOut(auth);
                } else {
                  navigate("/signin");
                }
              }}
            >
              {user ? "Logout" : "Login"}
            </button>

            {!user && (
              <button
                className="bg-[#190e7b] sm:text-[16px] text-[12px] sm:px-4 sm:w-20 sm:py-2 px-2 py-[7px] mr-1 md:mr-2 text-center ml-auto md:ml-0  rounded-[10px] text-white font-medium  hidden md:block  "
                onClick={() => {
                  navigate("/register");
                }}
              >
                SignUp
              </button>
            )}
            <img
              src={logo}
              style={{ mixBlendMode: "multiply" }}
              className="hidden sm:block sm:h-14 sm:w-14 w-10 h-10 mr-4"
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
