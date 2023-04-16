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
import RatesCard from "../components/RatesCard";
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
        <h2>
          Today's Exchange Rates
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span style={{ margin: '0 10px' }}>
                <RatesCard className="rates-card" rate={"1500"} transaction_type={transactionType.UsdToLbp} />
            </span>
          <span style={{ margin: '0 10px' }}>
            <RatesCard className="rates-card" rate={"0"} transaction_type={transactionType.LbpToUsd} />
          </span>
        </div>


        <hr />
        <h2>
          Currency Converter
        </h2>
        <ConvertCalculator />


        <h2>Convert values based on current rates</h2>
        <form name="transaction-entry">
          <div className="amount-input">
            <label htmlFor="lbp-amount">LBP Amount</label>
            <input
              id="lbp-amount"
              type="number"
              value={calculatorLbpValue}
              onChange={(e) => setCalculatorLbpValue(e.target.value)}
            />
            <label htmlFor="usd-amount">USD Amount</label>
            <input
              id="usd-amount"
              type="number"
              value={calculatorUsdValue}
              onChange={(e) => setCalculatorUsdValue(e.target.value)}
            />
          </div>
          <Select
            id="conversion-type"
            value={conversionType}
            onChange={(e) => setConversionType(e.target.value)}
          >
            <MenuItem value="usd-to-lbp">USD to LBP</MenuItem>
            <MenuItem value="lbp-to-usd">LBP to USD</MenuItem>
          </Select>
          <Button
            id="add-button"
            className="button"
            type="button"
            onClick={convertItem}
            variant="contained"
            sx={{
              bgcolor: "blue",
              color: "white",
              "&:hover": {
                bgcolor: "white",
                color: "blue",
                borderColor: "blue",
              },
            }}
          >
            Convert
          </Button>
          <Button
            id="clear-button"
            className="button"
            type="button"
            onClick={() => {
              setCalculatorUsdValue("");
              setCalculatorLbpValue("");
            }}
            variant="contained"
            sx={{
              bgcolor: "blue",
              color: "white",
              "&:hover": {
                bgcolor: "white",
                color: "blue",
                borderColor: "blue",
              },
            }}
          >
            Clear
          </Button>
        </form>
      </div>
    </>
  );
}

export default Home;
