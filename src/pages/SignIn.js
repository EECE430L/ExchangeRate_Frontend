import React, { useState, useContext } from 'react';
import "../css/signIn.css";
import logo from "../media/icon.png";
import {Alert, Button, Snackbar, TextField} from "@mui/material";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
    let [activeTab, setActiveTab] = useState('signIn');
    let [user_name, setUser_name] = useState("");
    let [password, setPassword] = useState("");
    let [missingInput, setMissingInput] = useState(false);
    let navigate = useNavigate();
    const { signup, login } = useContext(AuthContext);


    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleUsernameChange = (event) => {
        setUser_name(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

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
            try {
                //awaiting signup's completion before logging in to avoid race conditions
                await signup({ user_name, password });
                await login({ user_name, password });
                navigate("/");
            } catch (error) {
                console.error(error);
            }
        }
    }

    function closeAlert() {
        setMissingInput(false);
    };

    return (
        <>
            <Snackbar
                open={missingInput}
                autoHideDuration={3000}
                onClose={closeAlert}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert severity="error">Please fill in all inputs before submitting the form.</Alert>
            </Snackbar>

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
                            className={activeTab === 'signIn' ? 'active' : ''}
                            onClick={() => handleTabChange('signIn')}
                        >
                            Sign In
                        </button>
                        <button
                            className={activeTab === 'signUp' ? 'active' : ''}
                            onClick={() => handleTabChange('signUp')}
                        >
                            Sign Up
                        </button>
                    </div>
                    {activeTab === 'signIn' ?
                        <p className="sign-in-instructions">Sign into existing account</p> :
                        <p className="sign-in-instructions">Create a new account</p>
                    }

                    <TextField
                        variant="outlined"
                        className="amount-textfield sign-in-textfield"
                        fullWidth
                        label="Username"
                        value={user_name}
                        onChange={handleUsernameChange}
                        inputProps={{
                            style: { padding: '15px' }
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
                            style: { padding: '15px' }
                        }}
                    />

                    <Button
                        className="record-transaction-button"
                        variant="contained"
                        size="large"
                        onClick={handleSignInButtonClick}
                    >
                        {activeTab === 'signIn' ? "Sign In" : "Sign Up" }
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SignInPage;
