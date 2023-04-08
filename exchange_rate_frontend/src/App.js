import "./App.css";
import Navbar from "./components/Navbar";
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
} from "./utility/localStorage";

function App() {
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
  let [transactionType, setTransactionType] = useState("usd-to-lbp");
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
      <Navbar />
      <div className="App">
        <Snackbar
          elevation={6}
          variant="filled"
          open={authState === States.USER_AUTHENTICATED}
          autoHideDuration={2000}
          onClose={() => setAuthState(States.PENDING)}
        >
          <Alert severity="success">Success</Alert>
        </Snackbar>

        <div className="wrapper">
          <h2>Today's Exchange Rate</h2>
          <p>LBP to USD Exchange Rate</p>
          <h3>
            Buy USD:
            <span id="buy-usd-rate">
              &nbsp;
              {!buyUsdRate ? "Not available yet" : buyUsdRate.toFixed(2)}
            </span>
          </h3>
          <h3>
            Sell USD:
            <span id="sell-usd-rate">
              &nbsp;
              {!sellUsdRate ? "Not available yet" : sellUsdRate.toFixed(2)}
            </span>
          </h3>

          <hr />

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
        <div className="wrapper">
          <h2>Record a recent transaction</h2>
          <form name="transaction-entry">
            <div className="amount-input">
              <label htmlFor="lbp-amount">LBP Amount</label>
              <input
                id="lbp-amount"
                type="number"
                value={lbpInput}
                onChange={(e) => setLbpInput(e.target.value)}
              />{" "}
              <label htmlFor="usd-amount">USD Amount</label>
              <input
                id="usd-amount"
                type="number"
                value={usdInput}
                onChange={(e) => setUsdInput(e.target.value)}
              />
            </div>
            <Select
              id="transaction-type"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <MenuItem value="usd-to-lbp">USD to LBP</MenuItem>
              <MenuItem value="lbp-to-usd">LBP to USD</MenuItem>
            </Select>
            <Button
              id="add-button"
              className="button"
              type="button"
              onClick={addItem}
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
              Add
            </Button>
          </form>
          {userToken && (
            <div className="wrapper">
              <Typography variant="h5">Your Transactions</Typography>
              <DataGrid
                rows={userTransactions}
                columns={[
                  { field: "usd_to_lbp", headerName: "USD to LBP", flex: 1 },
                  { field: "usd_amount", headerName: "USD Amount", flex: 1 },
                  { field: "lbp_amount", headerName: "LBP Amount", flex: 1 },
                  { field: "added_date", headerName: "Added Date", flex: 1 },
                ]}
                autoHeight
                hideScrollbar={true}
                hideFooter={true}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
