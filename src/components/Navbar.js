import React, { useState, useContext } from "react";
import "../css/navbar.css";
import Button from "react-bootstrap/Button";
import logo from "../media/icon.png";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Navbar() {
  //source: navbar style, css and responsiveness animation inspired by an old project I did in EECE 437
  let [showBars, setShowBars] = useState(false);
  let [active, setActive] = useState("nav-menu");
  let [icon, setIcon] = useState("nav-toggler");
  const { isAuthenticated, logout } = useContext(AuthContext);
  let navigate = useNavigate();

  //source: https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page
  function redirectSignIn() {
    navigate("/sign-in");
  }

  async function handleLogOut(event) {
    await logout();
    navigate("/");
  }

  function navToggle() {
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
  }

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
          <a
            href={isAuthenticated ? "/my-exchange-history" : "/sign-in"}
            className="nav-text nav-item"
          >
            My Exchanges
          </a>
          <ul className="dropdown-menu" style={{ listStyleType: "none", paddingInlineStart: "0" }}>
            <li>
              <a href={isAuthenticated ? "/exchange-service" : "/sign-in"} className="nav-text">
                Exchange Service
              </a>
            </li>
            <li>
              <a href={isAuthenticated ? "/pending-offers" : "/sign-in"} className="nav-text">
                Pending Offers
              </a>
            </li>
            <li>
              <a href={isAuthenticated ? "/my-exchange-history" : "/sign-in"} className="nav-text">
                My Exchange History
              </a>
            </li>
          </ul>
        </li>
      </ul>
      {isAuthenticated ? (
        <Button className="sign-in-button" onClick={handleLogOut}>
          Log Out
        </Button>
      ) : (
        <Button className="sign-in-button" onClick={redirectSignIn}>
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
