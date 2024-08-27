import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Account from "./Account";
import { Link } from "react-router-dom";
import { BsRobot } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { HashLink } from "react-router-hash-link";
import axios from "axios";
import { useNavigate } from "react-router";
import {showSuccessToast} from "./toastify.js";

function Heading() {
  const [showAccount, setShowAccount] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [secondname, setSecondname] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Create a ref for the profile dropdown to check if a click is inside the dropdown.
  const profileDropdownRef = useRef(null);

  function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        await axios.get("/backend/api/v1/users/logout");
        showSuccessToast("Logout Successful");
        navigate("/");
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    return (
      <a
        className="nav_signup"
        onClick={handleLogout}
        style={{ cursor: "pointer" }}
      >
        Log Out
      </a>
    );
  }
  useEffect(() => {
    const checkLoginStatus = async () => {
      const { data } = await axios("/backend/api/v1/users/me");
      const { success } = data;
      if (success) {
        const { firstName, secondName } = data.user;
        setSecondname(secondName);
        setFirstname(firstName);
      }
      setIsLoggedIn(success);
    };

    const intervalId = setInterval(checkLoginStatus, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const closeProfileDropdown = () => {
    setShowProfileDropdown(false);
  };

  // Attach a click event listener to the document to handle clicks anywhere on the page.
  useEffect(() => {
    function handleClickOutside(event) {
      // Close the profile dropdown if it's open and the click occurred outside of the dropdown.
      if (showProfileDropdown) {
        if (
          profileDropdownRef.current &&
          !profileDropdownRef.current.contains(event.target)
        ) {
          setShowProfileDropdown(false);
        }
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="nav_left">
        <span className="nav_title">Caring hands</span>
        <div>
          <Link to="/">
            <button className="nav_home">Home</button>
          </Link>
          <HashLink to="/#about" className="nav_home">
            About
          </HashLink>
        </div>
      </div>
      <button className="chatbot-icon" id="open-button">
        <BsRobot />
      </button>
      {isLoggedIn ? (
        <div
          className="profile"
          onClick={handleProfileClick}
          ref={profileDropdownRef}
        >
          <div>
            <CgProfile style={{ fontSize: "1.7vw", marginRight: "0.1vw" }} />
          </div>
          <div>
            <LogoutButton />
          </div>
          {showProfileDropdown && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <p>{firstname} {secondname}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link to="/account" className="nav_signup">
          Sign Up / Login
        </Link>
      )}
      {showAccount && <Account />}
      {showProfileDropdown && (
        <div className="overlay" onClick={closeProfileDropdown}></div>
      )}
    </div>
  );
}

export default Heading;
