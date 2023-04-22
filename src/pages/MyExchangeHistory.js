import React, { useState, useEffect } from "react";
import "../css/myExchangeHistory.css";
import RecordTransaction from "../components/RecordTransaction.js";
import UserTransactionsTable from "../components/UserTransactionsTable.js";
import { transactionType } from "../enums/transactionType.js";
import { baseUrl } from "../config/Config.js";
import AuthContext from "../context/AuthContext";
import { getUserToken } from "../utility/tokenStorage";

function ExchangeService() {
  let [transactionsData, setTransactionsData] = useState();

  useEffect(() => {
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
        console.error(error);
      }
    }
    fetchUserTransactions();
  }, []);

  return (
    <>
      <div className="wrapper user-transactions-table-container">
        <div className="header">
          <h1>My Transactions</h1>
        </div>
        <p className="my-exchanges-instructions">
          View your transaction history with external exchange services and other users.
        </p>
        {/* Must wait for transactionsData before rendering component
        source: https://stackoverflow.com/questions/74656680/react-how-to-wait-on-prop-data-before-rendering-child-component */}
        {transactionsData ? <UserTransactionsTable data={transactionsData} /> : null}
      </div>
      <div style={{ height: "4vh" }}></div>
    </>
  );
}

export default ExchangeService;
