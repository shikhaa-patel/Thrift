import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import pic from "../images/pic1.avif";
import logo from "../images/juet_logo.png";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  let navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, { displayName: name });
      navigate("/home");
    } catch (error) {
      toast(error.code, { type: "error" });
    }
  };
  return (
    <div className="bg-gray-100 flex md2:justify-between justify-center items-center min-h-screen">
      <div className="py-[12px] px-[12px]  flex flex-col xl:py-[28px] xl:px-[32px]  xsm:py-[20px] xsm:px-[20px] justify-center items-center">
        <div className="sm:mb-[30px] mb-[20px] justify-between items-center  flex shadow-md w-[250px]   xl:w-[788px]  xsm:w-[320px] sm:w-[530px] lg2:w-[670px]  lg:w-[600px]  md2:w-[440px]  rounded-[8px] px-[5px]">
          {/* <h1 className="text-[28px] font-semibold pl-[20px] ">Logo</h1> */}
          <img
            src={logo}
            style={{ mixBlendMode: "multiply" }}
            className=" xl:h-16 xl:w-16 xsm:w-12 xsm:h-12 w-8 h-8 xsm:ml-3 ml-1"
          />
          <h6 className="font-black text-[16px] xsm:text-[20px] md2:text-[26px] md2:block block sm:hidden lg:hidden">
            Get Started !!
          </h6>
          <h1 className=" font-black md-text-[32px] md2:hidden hidden sm:block lg:block ">
            Get Started !!
          </h1>
          <button
            className=" pr-[20px] text-[26px] text-blue-800 font-semibold hover:font-bold hover:text-blue-900"
            onClick={() => navigate("/home")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              className="bi bi-house-door-fill md:w-[34px] w-6 h-6 sm:h-[34px] sm:w-[34px]"
              viewBox="0 0 16 16"
            >
              {" "}
              <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />{" "}
            </svg>
          </button>
        </div>
        <div className="shadow-lg w-[250px]   xl:w-[788px]  xsm:w-[320px] sm:w-[530px] lg2:w-[670px]  lg:w-[600px]  md2:w-[440px] flex flex-col rounded-[15px] xsm:p-[20px] p-[10px] ">
          <h1 className="xsm:mb-[32px] mb-[20px] text-[24px] font-bold">
            Register
          </h1>
          <div className="">
            <label className="xsm:text-[14px] text-[12px] xl:text-[14px] font-medium  text-[#1A1A1A] ">
              Full Name
              <br />
              <input
                type="text"
                placeholder="Enter your Name"
                required
                name="fullName"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className=" w-[220px] h-[30px] p-[5px] xl:w-[724px] xsm:w-[280px] sm:w-[450px] xsm:h-[40px] md2:w-[400px] border border-[#DFDBD8] rounded-[8px] py-[9px] lg:w-[550px] lg2:w-[600px] xsm:pl-[12px] xl:pl-[8px] mt-[4px] mb-3 xl:mb-[24px]  font-normal"
              />
            </label>
            <label className="xsm:text-[14px] text-[12px] xl:text-[14px] font-medium  text-[#1A1A1A] ">
              Email
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className=" w-[220px] h-[30px] p-[5px] xl:w-[724px] xsm:w-[280px] sm:w-[450px] xsm:h-[40px] md2:w-[400px] border border-[#DFDBD8] rounded-[8px] py-[9px] lg2:w-[600px] xsm:pl-[12px] xl:pl-[8px] mt-[4px] xl:mb-[24px] mb-3 font-normal lg:w-[550px] "
              />
            </label>
            <label className="xsm:text-[14px] text-[12px] xl:text-[14px] font-medium  text-[#1A1A1A] ">
              Password
              <br />
              <input
                type="password"
                placeholder="Enter your Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className=" w-[220px] h-[30px] p-[5px] xl:w-[724px] xsm:w-[280px] sm:w-[450px] xsm:h-[40px] md2:w-[400px] border border-[#DFDBD8] rounded-[8px] py-[9px] lg2:w-[600px] xsm:pl-[12px] xl:pl-[8px] mt-[4px] xl:mb-[20px] mb-3 font-normal lg:w-[550px] "
              />
            </label>
          </div>
          <br />
          <button
            className="lg:w-[250px] xl:h-[48px] xl:w-[158px] xsm:w-[280px] h-[40px] py-[8px] xsm:text-[16px] w-[220px] text-[12px] font-semibold md:w-[300px] bg-white  rounded-[64px] border border-[#1A1A1A] hover:shadow-lg hover:font-bold"
            onClick={handleSignup}
          >
            Register
          </button>
          <h2 className="text-[14px] text-black mt-[20px]">
            Already have Account ?<Link to="/signin"> Login</Link>
          </h2>
        </div>
      </div>
      <div className=" h-screen w-[650px] md2:block hidden overflow-hidden">
        <img className="min-h-screen w-full" src={pic} />
      </div>
    </div>
  );
}
