import React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Snackbar,
  Alert,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  getUserToken,
  saveUserToken,
  clearUserToken,
} from "../utility/localStorage";
import RateCard from "../components/RateCard";
import ConvertCalculator from "../components/ConvertCalculator";

import { transactionType } from "../enums/transactionType.js";
import "../css/home.css";

function Home() {
  const States = {
    PENDING: "PENDING",
    USER_CREATION: "USER_CREATION",
    USER_LOG_IN: "USER_LOG_IN",
    USER_AUTHENTICATED: "USER_AUTHENTICATED",
  };

  let [buyUsdRate, setBuyUsdRate] = useState(null);
  let [sellUsdRate, setSellUsdRate] = useState(null);
  let [lbpInput, setLbpInput] = useState("");
  let [usdInput, setUsdInput] = useState("");
  // let [transactionType, setTransactionType] = useState("usd-to-lbp");
  let [calculatorUsdValue, setCalculatorUsdValue] = useState("");
  let [calculatorLbpValue, setCalculatorLbpValue] = useState("");
  let [conversionType, setConversionType] = useState("usd-to-lbp");
  let [userTransactions, setUserTransactions] = useState([]);
  let [userToken, setUserToken] = useState(getUserToken());
  let [authState, setAuthState] = useState(States.PENDING);

  function convertItem() {
    if (conversionType == "usd-to-lbp") {
      setCalculatorLbpValue(calculatorUsdValue * sellUsdRate);
    } else {
      setCalculatorUsdValue(calculatorLbpValue / buyUsdRate);
    }
  }

  async function addItem() {
    const headers = { "Content-type": "application/json" };

    if (userToken) {
      headers["Authorization"] = "Bearer " + userToken;
    }

    const response = await fetch(`$dummyURL/transaction`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        lbp_amount: parseFloat(lbpInput),
        usd_amount: parseFloat(usdInput),
        usd_to_lbp: transactionType === "usd-to-lbp",
      }),
    });
    setLbpInput("");
    setUsdInput("");
    // fetchRates();
  }

  return (
    <>
      <div>
        <h2 className="home-card-rates-title home-card-title">
          Today's Exchange Rates
        </h2>
        <div className="home-card home-card-rates">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span style={{ margin: '0 10px' }}>
                <RateCard className="rates-card" rate={"1500"} exchange_direction={transactionType.UsdToLbp} />
            </span>
          <span style={{ margin: '0 10px' }}>
            <RateCard className="rates-card" rate={"0"} exchange_direction={transactionType.LbpToUsd} />
          </span>
        </div>
      </div>

        <h2 className="home-card-title home-card-converter-title">
          Currency Converter
        </h2>
        <div className="home-card home-card-converter">
          <ConvertCalculator usdToLbpRate={1500} lbpToUsdRate={1500} />
        </div>
      </div>
    </>
  );
}

export default Home;
