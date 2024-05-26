import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirm: "",
    email: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    if ((formData.password === formData.confirm)&&(formData.username!="admin")) {
      const response = await fetch(
        "http://localhost:5000/client/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const json = await response.json();
      if (!response.ok) {
        setLoading(false);
        setError(json.error);
        console.log(json.error);
      }
      if (response.ok) {
        setLoading(false);
        dispatch(login(json));
      }

      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirm: "",
        email: "",
      });
    } else {
      setError("Password or Username do not match");
    }
  };
  const [type, setType] = useState(false);
  const switchType = () => {
    setType((preTYpe) => !preTYpe);
  };
  return (
    <div className="mt-28 bg-gray-200 flex items-center justify-center p-10">
      <div className="font-[sans-serif] text-[#333] bg-white">
        <div className="min-h-screen flex fle-col items-center justify-center p-6">
          <div className="grid md:grid-cols-2 items-center gap-6 max-w-7xl w-full">
            <form className="md:max-w-md w-full" onSubmit={handleSubmit}>
              <h3 className="text-2xl font-extrabold mb-10">Registration</h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="firstName" className="text-sm mb-2 block">
                    First name
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    className="bg-gray-100 w-full text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                    placeholder="Enter name"
                    onChange={handleChange}
                    value={formData.firstName}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="text-sm mb-2 block">
                    Last name
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    className="bg-gray-100 w-full text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                    placeholder="Enter name"
                    onChange={handleChange}
                    value={formData.lastName}
                  />
                </div>
                <div>
                  <label htmlFor="username" className="text-sm mb-2 block">
                    Username
                  </label>
                  <input
                    name="username"
                    type="text"
                    className="bg-gray-100 w-full text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                    placeholder="Enter name"
                    onChange={handleChange}
                    value={formData.username}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm mb-2 block">
                    Email
                  </label>
                  <input
                    name="email"
                    type="text"
                    className="bg-gray-100 w-full text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                    placeholder="Enter email"
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="text-sm mb-2 block">
                    Password
                  </label>
                  <input
                    name="password"
                    type={type ? "text" : "password"}
                    className="bg-gray-100 w-full text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                    placeholder="Enter password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                </div>
                <div>
                  <label htmlFor="confirm" className="text-sm mb-2 block">
                    Confirm password
                  </label>
                  <input
                    name="confirm"
                    type="password"
                    className="bg-gray-100 w-full text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                    placeholder="Retype password"
                    onChange={handleChange}
                    value={formData.confirm}
                  />
                </div>
              </div>
              <div className="flex mt-2 -mx-3">
                {error && (
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
                      <span className="font-medium">Error!</span>: {error}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-3">
                {isLoading ? (
                  <button
                    type="submit"
                    className="py-4 px-6 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-500 hover:bg-blue-600 active:bg-blue-500"
                  >
                    Loading
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18px"
                      fill="#fff"
                      className="ml-2 inline animate-spin"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
                        data-original="#000000"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="py-4 px-6 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                  >
                    Create an account
                  </button>
                )}
              </div>
              <p className="text-sm mt-6">
                Already have an account?
                <Link
                  to="/login"
                  className="text-blue-500 font-semibold hover:underline ml-1"
                >
                  Login here
                </Link>
              </p>
            </form>
            <div className="h-full max-md:mt-10">
              <img
                src="./images/signup.webp"
                className="w-full h-full object-cover"
                alt="Dining Experience"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
