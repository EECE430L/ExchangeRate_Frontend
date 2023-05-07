import React, { useState, useEffect, useContext } from "react";
import "../css/myExchangeHistory.css";
import { Button } from "@mui/material";
import UserExchangesTable from "../components/UserExchangesTable.js";
import { baseUrl } from "../config/Config.js";
import AuthContext from "../context/AuthContext";
import { getUserToken } from "../utility/tokenStorage";
import { useNavigate } from "react-router-dom";
import SnackbarAlert from "../components/SnackbarAlert";

function ExchangeService() {
  let [transactionsData, setTransactionsData] = useState();
  let [emailSent, setEmailSent] = useState(false);
  let [emailFailed, setEmailFailed] = useState(false);
  const { logout } = useContext(AuthContext);
  let navigate = useNavigate();

  async function fetchUserTransactions() {
    const userToken = getUserToken();
    try {
      const response = await fetch(`${baseUrl}/transaction`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = await response.json();
      setTransactionsData(data);
    } catch (error) {
      if (error.response && error.response.status == 401) {
        logout();
        navigate("/sign-in");
      } else {
        console.error(error);
      }
    }
  }

  async function exportTransactionsByEmail() {
    const userToken = getUserToken();
    try {
      const response = await fetch(`${baseUrl}/transaction/excel-transactions`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setEmailSent(true);
    } catch (error) {
      if (error.response && error.response.status == 401) {
        logout();
        navigate("/sign-in");
      } else {
        setEmailFailed(true);
      }
    }
  }

  //API call when page is loaded to get all user's transactions
  useEffect(() => {
    fetchUserTransactions();
  }, []);

  function closeSuccessAlert() {
    setEmailSent(false);
  }

  function closeErrorAlert() {
    setEmailFailed(false);
  }

  return (
    <>
      <SnackbarAlert
        open={emailSent}
        message="Your transactions have been successfully sent to your email."
        onClose={closeSuccessAlert}
        severity="success"
      />
      <SnackbarAlert
        open={emailFailed}
        message="An error occured while sending the email."
        onClose={closeErrorAlert}
        severity="error"
      />
      <div className="wrapper user-transactions-table-container">
        <div className="header">
          <h1>My Exchange History</h1>
        </div>
        <p className="my-exchanges-instructions">
          View your exchange history with external exchange services and other users.
        </p>
        {/* Must wait for transactionsData before rendering component
        source: https://stackoverflow.com/questions/74656680/react-how-to-wait-on-prop-data-before-rendering-child-component */}
        {transactionsData ? <UserExchangesTable data={transactionsData} /> : null}
        <div className="export-button-container">
          <Button
            variant="outlined"
            className="export-by-email-button"
            onClick={exportTransactionsByEmail}
          >
            Export by Email
          </Button>
        </div>
      </div>
      <div style={{ height: "4vh" }}></div>
    </>
  );
}

export default ExchangeService;
