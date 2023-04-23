import React, { useState, useEffect, useContext } from "react";
import "../css/myExchangeHistory.css";
import UserExchangesTable from "../components/UserExchangesTable.js";
import { baseUrl } from "../config/Config.js";
import AuthContext from "../context/AuthContext";
import { getUserToken } from "../utility/tokenStorage";
import { useNavigate } from "react-router-dom";

function ExchangeService() {
  let [transactionsData, setTransactionsData] = useState();
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
      console.log(data);
    } catch (error) {
      if (error.response && error.response.status == 401) {
        logout();
        navigate("/sign-in");
      } else {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    fetchUserTransactions();
  }, []);

  return (
    <>
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
      </div>
      <div style={{ height: "4vh" }}></div>
    </>
  );
}

export default ExchangeService;
