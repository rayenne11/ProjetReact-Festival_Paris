import React, { useEffect } from "react";
import { login } from "../../store/AuthSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  const [msg, setMsg] = useState(null);
  const [isLoading, setLoading] = useState(null);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  function hamdleChange(e) {
    const { value, name } = e.target;
    setLoginData((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
  }

  const handelSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMsg(null);

    const response = await fetch("http://localhost:5000/client/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });
    const json = await response.json();
        // Store user data in local storage
        localStorage.setItem("user", JSON.stringify(json));
    if (!response.ok) {
      console.log("lennaaaaa");
      setLoading(false);
      setMsg(json.error);
    }
    if (response.ok) {
      setLoading(false);
      dispatch(login(json));
    }

    setLoginData({
      username: "",
      password: "",
    });
  };
  const [type, setType] = useState(false);
  const switchType = () => {
    setType((preTYpe) => !preTYpe);
  };

  const mode = useSelector((state) => state.theme);
  return (
    <div className="mt-28 font-[sans-serif] text-[#333] bg-white flex items-center justify-center md:h-screen p-4">
      <div className="shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] max-w-6xl rounded-md p-6">
        <a href="">
          <img
            src="./images/logo.png"
            alt="logo"
            className="w-40 md:mb-4 mb-12"
          />
        </a>
        <div className="grid md:grid-cols-2 items-center gap-8">
          <div className="max-md:order-1">
            <img
              src="./images/login.webp"
              className="lg:w-11/12 w-full object-cover"
              alt="login-image"
            />
          </div>
          <form className="max-w-md w-full mx-auto" onSubmit={handelSubmit}>
            <div className="mb-12">
              <h3 className="text-4xl font-extrabold text-blue-600">Log in</h3>
            </div>
            <div>
              <div className="relative flex items-center">
                <input
                  name="username"
                  type="text"
                  required
                  className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                  placeholder="Enter username"
                  value={loginData.username}
                  onChange={hamdleChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g
                    clipPath="url(#a)"
                    transhtmlform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      strokeMiterlimit="10"
                      strokeWidth="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="mt-8">
              <div className="relative flex items-center">
                <input
                  name="password"
                  type={type ? "text" : "password"}
                  required
                  className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                  placeholder="Enter password"
                  value={loginData.password}
                  onChange={hamdleChange}
                />
                <svg
                  onClick={switchType}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 mt-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm">
                  Remember me
                </label>
              </div>
              <div>
                <a href="" className="text-blue-600 text-sm hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>
            <div className="flex mt-2 -mx-3">
              {msg && (
                <div
                  className="flex w-full bg-red-100 dark:bg-red-200 rounded-lg p-4 mx-3 mb-4 text-sm text-red-700"
                  role="alert"
                >
                  <svg
                    className="w-5 h-5 inline mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <div>
                    <span className="font-medium">Error!</span>: {msg}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-12">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Log in
              </button>
              <p className="text-sm text-center mt-8">
                Don't have an account
                <Link
                  to="/signup"
                  className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
