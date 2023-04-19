import React, { useState } from 'react';
import "../css/signIn.css";
import PercentChange from "../components/PercentChange";
import RateCard from "../components/RateCard";
import {transactionType} from "../enums/transactionType";
import RateGraph from "../components/RateGraph";
import logo from "../media/icon.png";
import {Alert, Button, Snackbar, TextField} from "@mui/material";

const SignInPage = () => {
    const [activeTab, setActiveTab] = useState('signIn');
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let [missingInput, setMissingInput] = useState(false);

    const toggleTab = (tab) => {
        setActiveTab(tab);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSignInButtonClick = (event) => {
        if (!username || !password) {
            setMissingInput(true);
            return;
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
                            onClick={() => toggleTab('signIn')}
                        >
                            Sign In
                        </button>
                        <button
                            className={activeTab === 'signUp' ? 'active' : ''}
                            onClick={() => toggleTab('signUp')}
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
                        value={username}
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
