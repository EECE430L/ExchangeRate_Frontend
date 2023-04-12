import React, { useState } from "react";
import "../css/navbar.css";
import Button from "react-bootstrap/Button";
import logo from "../media/icon.png";

function Navbar() {
  //navbar style, css and responsiveness animation inspired by an old project I did
  const [active, setActive] = useState("nav-menu");
  const [icon, setIcon] = useState("nav-toggler");
  const isLoggedIn =
    sessionStorage.getItem("access") !== null ||
    sessionStorage.getItem("refresh") !== null;

  const navToggle = () => {
    if (active === "nav-menu") {
      setActive("nav-menu nav-active");
    } else setActive("nav-menu");

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
        <div className="vertical-line"></div>
        <li className="nav-item">
          <a href="/statistics" className="nav-text nav-item">
            Statistics
          </a>
        </li>
        <div className="vertical-line"></div>

        <li className="nav-item">
          <a href="/exchange-service" className="nav-text">
            Exchange Service
          </a>
        </li>
      </ul>
      {isLoggedIn ? (
        <Button className="sign-in-button">Log Out</Button>
      ) : (
        <Button
          className="sign-in-button"
          onClick={() =>
            window.location.replace(sessionStorage.getItem("MicrosoftLink"))
          }
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
