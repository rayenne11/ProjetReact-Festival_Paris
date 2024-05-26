import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../store/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../SideBar/SiseBar";
import ClientLoans from "../../pages/ClientLoans/ClientLoans";
import { getClientLoans } from "../../store/LoanSlice";
import FavoritesBooks from "../../components/FavoritesBooks/FavoritesBooks";
import { getFavoriteBooks } from "../../store/BookSlice";
import NotificationList from "../../components/Notifications/Notifications";
import { getNotifications } from "../../store/NotificationsSlice";

function Header({ isDarkMOde, setShowLogin }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showLoansModal, setShowLoansModal] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const dispatch = useDispatch();

  const { clientLoans } = useSelector((state) => state.loan);
  const { favoritesBooks } = useSelector((state) => state.book);
  const { notifications } = useSelector((state) => state.notification);
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) return;
    dispatch(getClientLoans());
    dispatch(getFavoriteBooks());
    dispatch(getNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;
    const fetchNotifications = async () => {
      dispatch(getNotifications());
    };

    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 5000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const toggleSidebar = () => {
    setShowMenu(!showMenu);
    document.body.style.overflow = showMenu ? "auto" : "hidden";
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const toggleLoansModal = () => {
    setShowLoansModal(!showLoansModal);
    document.body.style.overflow = showLoansModal ? "auto" : "hidden";
  };

  return (
    <header className="border-b bg-white font-sans min-h-[60px] px-10 py-3 fixed top-0 right-0 w-full tracking-wide  z-50 shadow-md">
      {/* client loans modal  */}
      {showLoansModal && (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <ClientLoans
            show={showLoansModal}
            setShow={() => toggleLoansModal()}
          />
        </div>
      )}
      {/* Notifications drop down */}
      {showNotifications && (
        <NotificationList
          show={showNotifications}
          setShow={setShowNotifications}
        />
      )}
      
      {/* side bar */}
      {showMenu && (
        <div className="fixed lg:hidden inset-0 p-4 w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <SideBar show={showMenu} setShow={() => toggleSidebar()} />
        </div>
      )}
      <div className="flex flex-wrap items-center max-lg:gap-y-6 max-sm:gap-x-4">
        <Link to="/">
          <img src="/images/logo.png" alt="logo" className="w-12" />
        </Link>
        <div
          id="collapseMenu"
          className="max-lg:hidden lg:!flex lg:items-center max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50"
        >
          <button
            id="toggleClose"
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 fill-black"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              ></path>
            </svg>
          </button>

          <ul className="lg:flex lg:gap-x-10 lg:absolute lg:left-1/2 lg:-translate-x-1/2 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:px-10 max-lg:py-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="mb-6 hidden max-lg:block">
              <a href="">
                <img
                  src="https://readymadeui.com/readymadeui.svg"
                  alt="logo"
                  className="w-36"
                />
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-3">
              <NavLink
                to="/"
                className="hover:text-[#007bff] text-[15px] text-[#007bff] block font-bold"
              >
                Home
              </NavLink>
            </li>

            <li className="group max-lg:border-b max-lg:py-3 relative">
              <NavLink
                to="/books"
                className="hover:text-[#007bff] text-gray-600 font-bold text-[15px] lg:hover:fill-[#007bff] block"
              >
                Books
              </NavLink>
            </li>
            <li className="max-lg:border-b max-lg:py-3">
              <NavLink
                to={user ? "/contact" : "/login"}
                // to="/contact"
                className="hover:text-[#007bff] text-gray-600 font-bold text-[15px] block"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex items-center ml-auto space-x-8">
          
          <button id="toggleOpen" className="lg:hidden" onClick={toggleSidebar}>
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-row gap-1 ml-3">
          {user ? (
            <button
              onClick={() => dispatch(logout())}
              className="px-6 py-2.5 hidden lg:block rounded-full text-white text-sm tracking-wider font-semibold border-none outline-none bg-orange-600 hover:bg-orange-700 active:bg-orange-600"
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2.5 hidden lg:block rounded-full text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      
    </header>
  );
}

export default Header;
