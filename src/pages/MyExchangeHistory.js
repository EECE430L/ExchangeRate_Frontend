import React, { useState } from "react";
import "../css/myExchangeHistory.css";
import RecordTransaction from "../components/RecordTransaction.js";
import UserTransactionsTable from "../components/UserTransactionsTable.js";
import { transactionType } from "../enums/transactionType.js";
import { baseUrl } from "../config/Config.js";

function ExchangeService() {
  let [
    recipientUsernameOfferTransaction,
    setRecipientUsernameOfferTransaction,
  ] = useState("");
  let [usdAmountOfferTransaction, setUsdAmountOfferTransaction] = useState("");
  let [lbpAmountOfferTransaction, setLbpAmountOfferTransaction] = useState("");
  let [exchangeTypeOfferTransaction, setExchangeTypeOfferTransaction] =
    useState("");

  const transactions = [
    {
      id: 1,
      exchangedWith: "Third Party",
      transactionType: "USD to LBP",
      usdAmount: 100,
      lbpAmount: 150000,
      date: "2022-04-19",
    },
  ];

  return (
    <>
      <div className="wrapper user-transactions-table-container">
        <div className="header">
          <h1>My Transactions</h1>
        </div>
        <p className="my-exchanges-instructions">
          View your transaction history with external exchange services and
          other users.
        </p>
        <UserTransactionsTable data={transactions} />
      </div>
      <div style={{ height: "4vh" }}></div>
    </>
  );
}

export default ExchangeService;
