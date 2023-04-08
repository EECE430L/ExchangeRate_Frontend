import React, { useState } from "react";
import "../css/navbar.css";
import Button from "react-bootstrap/Button";

function Navbar() {
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
      <a href="/" className="nav-brand nav-link nav-text">
        InflateRates
      </a>
      <ul className={active}>
        <li className="home-button">
          <a href="/" className="nav-link nav-text">
            Current Rates
          </a>
        </li>
        <li className="nav-item">
          <a href="/browse-listings" className="nav-link nav-text">
            Statistics
          </a>
        </li>
        <li className="nav-item">
          <a href="/create-listing" className="nav-link nav-text">
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
