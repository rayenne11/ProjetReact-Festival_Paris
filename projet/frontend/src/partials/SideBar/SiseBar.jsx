import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../store/AuthSlice";
import { getClient } from "../../store/ClientSlice";

function SiseBar({ show, setShow }) {
  const user = useSelector((state) => state.auth);
  const { client } = useSelector((state) => state.client);

  const sidebarRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClient());
  }, [user]);

  // Close sidebar when the user clicks outside the sidebar
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShow();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [show]);

  return (
    <nav
      ref={sidebarRef}
      className={`bg-white shadow-xl h-screen fixed top-0 right-0 min-w-[250px] py-6 font-[sans-serif] overflow-auto z-50 ${
        show ? "block" : "hidden"
      }`}
    >
      <div className="relative flex flex-col h-full">
        <div className="flex flex-row justify-between items-center px-5">
          <a href="" className="text-center">
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-[160px] inline"
            />
          </a>
          <span className="text-blue-500 cursor-pointer" onClick={setShow}>
            <i className="fa-solid fa-x"></i>
          </span>
        </div>
        <ul className="space-y-3 my-10 flex-1">
          <li>
            <NavLink
              onClick={setShow}
              to="/"
              className="text-sm flex items-center text-[#007bff] border-r-[5px]  bg-gray-100 px-8 py-4 transition-all active:border-[#077bff]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-[18px] h-[18px] mr-4"
                viewBox="0 0 512 512"
              >
                <path
                  d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0"
                  data-original="#000000"
                />
              </svg>
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={setShow}
              to="/books"
              className="text-[#333] text-sm flex items-center hover:text-[#007bff] hover:border-r-[5px] border-[#077bff] hover:bg-gray-100 px-8 py-4 transition-all active:border-[#077bff]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-[18px] h-[18px] mr-4"
                viewBox="0 0 16 16"
              >
                <path
                  d="M13 .5H3A2.503 2.503 0 0 0 .5 3v10A2.503 2.503 0 0 0 3 15.5h10a2.503 2.503 0 0 0 2.5-2.5V3A2.503 2.503 0 0 0 13 .5ZM14.5 13a1.502 1.502 0 0 1-1.5 1.5H3A1.502 1.502 0 0 1 1.5 13v-.793l3.5-3.5 1.647 1.647a.5.5 0 0 0 .706 0L10.5 7.207V8a.5.5 0 0 0 1 0V6a.502.502 0 0 0-.5-.5H9a.5.5 0 0 0 0 1h.793L7 9.293 5.354 7.647a.5.5 0 0 0-.707 0L1.5 10.793V3A1.502 1.502 0 0 1 3 1.5h10A1.502 1.502 0 0 1 14.5 3Z"
                  data-original="#000000"
                />
              </svg>
              <span>News</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={setShow}
              to="/contact"
              className="text-[#333] text-sm flex items-center hover:text-[#007bff] hover:border-r-[5px] border-[#077bff] hover:bg-gray-100 px-8 py-4 transition-all active:border-[#077bff]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                stroke="currentColor"
                className="w-[18px] h-[18px] mr-4"
                viewBox="0 0 682.667 682.667"
              >
                <defs>
                  <clipPath id="a" clipPathUnits="userSpaceOnUse">
                    <path d="M0 512h512V0H0Z" data-original="#000000" />
                  </clipPath>
                </defs>
                <g
                  clipPath="url(#a)"
                  transform="matrix(1.33 0 0 -1.33 0 682.667)"
                >
                  <path
                    fill="none"
                    strokeMiterlimit="10"
                    strokeWidth="40"
                    d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                    data-original="#000000"
                  />
                  <path
                    d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                    data-original="#000000"
                  />
                </g>
              </svg>
              <span>Contact</span>
            </NavLink>
          </li>
        </ul>
        <div className="flex flex-wrap items-center cursor-pointer border-t border-gray-200 px-4 py-4 gap-y-5">
          <img
            src="https://readymadeui.com/profile.webp"
            className="w-9 h-9 rounded-full border-white"
          />
          <div className="ml-4">
            <p className="text-sm text-[#333]">
              {client.firstName} {client.lastName}
            </p>
          </div>
          <div className="w-full">
            {user ? (
              <button
                onClick={() => {
                  dispatch(logout());
                  setShow();
                }}
                type="button"
                className=" px-6 py-2.5 rounded-full text-white text-sm tracking-wider font-semibold border-none outline-none bg-orange-600 hover:bg-orange-700 active:bg-orange-600"
              >
                Log out
              </button>
            ) : (
              <Link
                onClick={setShow}
                to="/login"
                className=" px-6 py-2.5 rounded-full text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default SiseBar;
