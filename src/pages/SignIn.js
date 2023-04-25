import React, { useState, useContext } from "react";
import "../css/signIn.css";
import logo from "../media/icon.png";
import { Button, TextField } from "@mui/material";
import AuthContext from "../context/AuthContext";
import SnackbarAlert from "../components/SnackbarAlert";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  let [activeTab, setActiveTab] = useState("signIn");
  let [email, setEmail] = useState("");
  let [user_name, setUser_name] = useState("");
  let [password, setPassword] = useState("");
  let [missingInput, setMissingInput] = useState(false);
  let [notEmail, setNotEmail] = useState(false);
  const {
    signup,
    login,
    incorrectCredentials,
    setIncorrectCredentials,
    accountLoginSuccess,
    setAccountLoginSuccess,
    accountCreationSuccess,
    setAccountCreationSuccess,
    usernameTaken,
    setUsernameTaken,
    emailTaken,
    setEmailTaken,
  } = useContext(AuthContext);
  let navigate = useNavigate();

  function handleTabChange(tab) {
    setActiveTab(tab);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleUsernameChange(event) {
    setUser_name(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  //made asynchronous to avoid race conditions
  const handleSignInButtonClick = async (event) => {
    if (!user_name || !password) {
      setMissingInput(true);
      return;
    }
    if (activeTab === "signIn") {
      await login({ user_name, password });
      navigate("/");
    } else {
      if (!email) {
        setMissingInput(true);
        return;
      }
      //email format verification using regex
      //source: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setNotEmail(true);
        return;
      }
      try {
        const successfulSignUp = await signup({ email, user_name, password });
        if (successfulSignUp) {
          setAccountCreationSuccess(true);
          return login({ user_name, password });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  function closeErrorAlert() {
    setMissingInput(false);
    setIncorrectCredentials(false);
    setUsernameTaken(false);
    setEmailTaken(false);
    setNotEmail(false);
  }

  function closeSuccessAlert() {
    setAccountCreationSuccess(false);
    navigate("/");
  }

  return (
    <>
      <SnackbarAlert
        open={missingInput}
        message="Please fill in all inputs before submitting the form."
        onClose={closeErrorAlert}
        severity="error"
      />
      <SnackbarAlert
        open={notEmail}
        message="Please input a valid email."
        onClose={closeErrorAlert}
        severity="error"
      />
      <SnackbarAlert
        open={incorrectCredentials}
        message="Incorrect credentials."
        onClose={closeErrorAlert}
        severity="error"
      />
      <SnackbarAlert
        open={usernameTaken}
        message="The username is not available."
        onClose={closeErrorAlert}
        severity="error"
      />
      <SnackbarAlert
        open={emailTaken}
        message="The email is not available."
        onClose={closeErrorAlert}
        severity="error"
      />
      <SnackbarAlert
        open={accountCreationSuccess}
        message="Account created successfully. Redirecting..."
        onClose={closeSuccessAlert}
        severity="success"
      />

      <div className="wrapper sign-in-wrapper">
        <div className="header">
          <h1>
            InflateRates
            <img className="logo-icon" src={logo} alt="Logo" />
          </h1>
        </div>
        <div className="wrapper-content sign-in-wrapper-content">
          <div className="tabs">
            <button
              className={activeTab === "signIn" ? "active" : ""}
              onClick={() => handleTabChange("signIn")}
            >
              Sign In
            </button>
            <button
              className={activeTab === "signUp" ? "active" : ""}
              onClick={() => handleTabChange("signUp")}
            >
              Sign Up
            </button>
          </div>
          {activeTab === "signIn" ? (
            <p className="sign-in-instructions">Sign into existing account</p>
          ) : (
            <p className="sign-in-instructions">Create a new account</p>
          )}

          {activeTab === "signUp" ? (
            <TextField
              variant="outlined"
              className="amount-textfield sign-in-textfield"
              fullWidth
              label="E-mail"
              value={email}
              onChange={handleEmailChange}
              inputProps={{
                style: { padding: "15px" },
              }}
            />
          ) : null}
          <TextField
            variant="outlined"
            className="amount-textfield sign-in-textfield"
            fullWidth
            label="Username"
            value={user_name}
            onChange={handleUsernameChange}
            inputProps={{
              style: { padding: "15px" },
            }}
          />

          <TextField
            variant="outlined"
            className="amount-textfield sign-in-textfield"
            fullWidth
            label="Password"
            value={password}
            onChange={handlePasswordChange}
            type="password"
            inputProps={{
              style: { padding: "15px" },
            }}
          />

          <Button
            className="record-transaction-button"
            variant="contained"
            size="large"
            onClick={handleSignInButtonClick}
          >
            {activeTab === "signIn" ? "Sign In" : "Sign Up"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
