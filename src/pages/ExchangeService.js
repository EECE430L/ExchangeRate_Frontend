import React, { useState, useContext } from "react";
import "../css/exchangeService.css";
import RecordTransaction from "../components/RecordTransaction.js";
import UserTransactionsTable from "../components/UserTransactionsTable.js";
import OfferTransaction from "../components/OfferTransaction.js";
import { transactionType } from "../enums/transactionType.js";
import SnackbarAlert from "../components/SnackbarAlert";
import AuthContext from "../context/AuthContext";
import { baseUrl } from "../config/Config.js";

function ExchangeService() {
  let [successRecordTransaction, setSuccessRecordTransaction] = useState(false);
  let [errorRecordTransaction, setErrorRecordTransaction] = useState(false);

  let [
    recipientUsernameOfferTransaction,
    setRecipientUsernameOfferTransaction,
  ] = useState("");
  let [usdAmountOfferTransaction, setUsdAmountOfferTransaction] = useState("");
  let [lbpAmountOfferTransaction, setLbpAmountOfferTransaction] = useState("");
  let [exchangeTypeOfferTransaction, setExchangeTypeOfferTransaction] =
    useState("");
  const { isAuthenticated } = useContext(AuthContext);

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

  async function createTransaction(lbp_amount, usd_amount, usd_to_lbp) {
    const userToken = localStorage.getItem("userToken");
    const response = await fetch(`${baseUrl}/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        lbp_amount: lbp_amount,
        usd_amount: usd_amount,
        usd_to_lbp: usd_to_lbp,
      }),
    });
    return response.ok;
  }

  //to make an API call in this file when a button is clicked in the RecordTransaction component,
  //I learned that I can define a function here and pass it as a prop to the component, and call the function when the button
  //is clicked. I used these links as sources:
  //https://stackoverflow.com/questions/48367998/passing-event-and-props-from-child-to-parent-in-react
  //https://stackoverflow.com/questions/60915262/how-to-pass-function-as-props-from-functional-parent-component-to-child
  async function handleRecordTransactionSubmit(
    usdAmount,
    lbpAmount,
    exchangeType
  ) {
    const responseOk = await createTransaction(
      usdAmount,
      lbpAmount,
      exchangeType
    );
    if (responseOk) {
      setSuccessRecordTransaction(true);
    } else {
      setErrorRecordTransaction(true);
    }
  }

  function handleOfferTransactionSubmit(
    recipientUsername,
    offerAmount,
    requestAmount,
    offerCurrency
  ) {
    setRecipientUsernameOfferTransaction(recipientUsername);
    if (offerCurrency === "USD") {
      setUsdAmountOfferTransaction(offerAmount);
      setLbpAmountOfferTransaction(requestAmount);
      setExchangeTypeOfferTransaction(transactionType.UsdToLbp);
    } else {
      setUsdAmountOfferTransaction(requestAmount);
      setLbpAmountOfferTransaction(offerAmount);
      setExchangeTypeOfferTransaction(transactionType.LbpToUsd);
    }
  }

  function closeSuccessAlert() {
    setSuccessRecordTransaction(false);
  }

  function closeErrorAlert() {
    setErrorRecordTransaction(false);
  }

  return (
    <>
      <SnackbarAlert
        open={successRecordTransaction}
        message="Successfully added exchange."
        onClose={closeSuccessAlert}
        severity="success"
      />

      <SnackbarAlert
        open={errorRecordTransaction}
        message="There was an error adding your exchange."
        onClose={closeErrorAlert}
        severity="error"
      />
      {/*source: https://dev.to/dawnind/3-ways-to-display-two-divs-side-by-side-3d8b#:~:text=The%20most%20common%20way%20to,using%20inline%2Dblock%20css%20property.&text=The%20inline%2Dblock%20property%20on,like%20an%20inline%20element%20does*/}
      {/*I used the above source to find an organized way to place 2 cards side by side and taking up the whole page*/}
      <div className="flex-parent-element">
        <div className="flex-child-element">
          <div className="header">
            <h1>Record an Exchange</h1>
          </div>
          <div className="flex-child-body">
            <p className="my-exchanges-instructions">
              To record an exchange you made, please input the amounts of each
              currency that were exchanged in your transaction. Then, select the
              type of the exchange.
            </p>
            <RecordTransaction onSubmit={handleRecordTransactionSubmit} />
          </div>
        </div>
        <div className="flex-child-element">
          <div className="header">
            <h1>Offer Transaction to User</h1>
          </div>
          <div className="flex-child-body">
            <p className="my-exchanges-instructions">
              To offer a transaction to a user, please input their username, the
              amount you are offering and in which currency, and the amount you
              are requesting.
            </p>
            <OfferTransaction onSubmit={handleOfferTransactionSubmit} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ExchangeService;
