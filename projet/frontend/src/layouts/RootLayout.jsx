import React, { useState } from "react";
import { logout } from "../store/AuthSlice";
import { switchTheme } from "../store/ModeSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../partials/Header/Header";
import Footer from "../partials/Footer/Footer";
import LoginAlert from "../components/Alerts/LoginAlert";

function RootLayout() {
  const dispatch = useDispatch();

  const isDarkMOde = useSelector((state) => state.theme);
  const user = useSelector((state) => state.auth);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
    document.body.style.overflow = showLoginModal ? "auto" : "hidden";
  };
  const switchMode = () => {
    dispatch(switchTheme());
  };
  return (
    <div
      className={`root-layout h-screen scroll-smooth ${
        isDarkMOde ? "dark" : ""
      }`}
    >
      {showLoginModal && (
        <LoginAlert show={showLoginModal} setShow={toggleLoginModal} />
      )}
      <Header
        isDarkMOde={isDarkMOde}
        user={user}
        setShowLogin={toggleLoginModal}
      />

      <Outlet setShowLogin={toggleLoginModal} />
      <Footer setShowLogin={toggleLoginModal} />
    </div>
  );
}

export default RootLayout;
