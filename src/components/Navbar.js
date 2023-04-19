import React, { useState } from "react";
import "../css/navbar.css";
import Button from "react-bootstrap/Button";
import logo from "../media/icon.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  //source: navbar style, css and responsiveness animation inspired by an old project I did in EECE 437
  let [showBars, setShowBars] = useState(false);
  const [active, setActive] = useState("nav-menu");
  const [icon, setIcon] = useState("nav-toggler");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //source: https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page
  let navigate = useNavigate();
  function redirectSignIn() {
    navigate("/sign-in");
  }

  const navToggle = () => {
    if (active === "nav-menu") {
      setActive("nav-menu nav-active");
      setShowBars(true);
    } else {
      setActive("nav-menu");
      setShowBars(false);
    }

    if (icon === "nav-toggler") {
      setIcon("nav-toggler toggle");
    } else setIcon("nav-toggler");
  };

  return (
    <nav className="nav">
      <a href="/" className="nav-brand nav-text">
        InflateRates
        <img className="logo-icon" src={logo} alt="Logo" />
      </a>
      <ul className={active}>
        <li className="nav-item">
          <a href="/" className="nav-text nav-item">
            Home
          </a>
        </li>
        {!showBars ? <div className="vertical-line"></div> : null}
        <li className="nav-item">
          <a href="/statistics" className="nav-text nav-item">
            Statistics
          </a>
        </li>
        {!showBars ? <div className="vertical-line"></div> : null}

        <li className="nav-item">
          <a href="/transaction-service" className="nav-text">
            Transaction Service
          </a>
        </li>
      </ul>
      {isLoggedIn ? (
        <Button className="sign-in-button">Log Out</Button>
      ) : (
        <Button
          className="sign-in-button"
          onClick={redirectSignIn}
        >
          Sign In
        </Button>
      )}
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;
