import React, { useState, useEffect } from "react";
import "../css/offerTransaction.css";
import {
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SnackbarAlert from "./SnackbarAlert";

function OfferTransaction({ onSubmit }) {
  let [recipientUsername, setRecipientUsername] = useState("");
  let [offerAmount, setOfferAmount] = useState("");
  let [requestAmount, setRequestAmount] = useState("");
  let [offerCurrency, setOfferCurrency] = useState("");
  let [requestCurrency, setRequestCurrency] = useState("");
  let [usdToLbp, setUsdToLbp] = useState();
  let [missingInput, setMissingInput] = useState(false);
  let [nonNumericInput, setNonNumericInput] = useState(false);

  function handleRecipientUsernameChange(event) {
    setRecipientUsername(event.target.value);
  }
  function handleOfferAmountChange(event) {
    setOfferAmount(event.target.value);
  }
  function handleRequestAmountChange(event) {
    setRequestAmount(event.target.value);
  }
  function handleOfferCurrencyChange(event) {
    setOfferCurrency(event.target.value);
  }

  //change other currency automatically upon selecting currency in drop down menu
  useEffect(() => {
    if (offerCurrency === "USD") {
      setRequestCurrency("LBP");
      setUsdToLbp(false);
    } else if (offerCurrency === "LBP") {
      setRequestCurrency("USD");
      setUsdToLbp(true);
    }
  }, [offerCurrency]);

  function handleOfferButtonClick() {
    if (!recipientUsername || !offerAmount || !requestAmount || !offerCurrency) {
      setMissingInput(true);
      return;
    }
    //define a numeric regular expression with optional decimal to compare against the inputs
    //source: https://stackoverflow.com/questions/10023845/regex-in-javascript-for-validating-decimal-numbers
    const numericRegex = /^\d+(\.\d+)?$/;
    if (!numericRegex.test(offerAmount) || !numericRegex.test(requestAmount)) {
      setNonNumericInput(true);
      return;
    }
    //call passed API function from ExchangeService page on the selected amounts
    onSubmit(recipientUsername, usdToLbp, parseFloat(offerAmount), parseFloat(requestAmount));
  }

  function handleClearButtonClick() {
    setRecipientUsername("");
    setOfferAmount("");
    setRequestAmount("");
    setOfferCurrency("");
    setRequestCurrency("");
  }

  function closeErrorAlert() {
    setMissingInput(false);
    setNonNumericInput(false);
  }

  return (
    <>
      {/* Alerts inspired by the frontend lab from class */}
      <SnackbarAlert
        open={missingInput}
        message="Please fill in all inputs before submitting the form."
        onClose={closeErrorAlert}
        severity="error"
      />
      <SnackbarAlert
        open={nonNumericInput}
        message="Please only input positive numbers."
        onClose={closeErrorAlert}
        severity="error"
      />

      <div className="container-column">
        <div className="textfield-and-label">
          <div>
            <Typography variant="subtitle4" className="currency-label request-label">
              Recipient username:
            </Typography>
          </div>
          <TextField
            className="request-textfield"
            variant="outlined"
            label="Enter username of recipient"
            value={recipientUsername}
            onChange={handleRecipientUsernameChange}
          />
        </div>

        <div className="form-row">
          <div>
            <Typography variant="subtitle4" align="center" className="currency-label request-label">
              I'm offering:
            </Typography>
          </div>
          <div className="input-container">
            <TextField
              className="request-textfield"
              variant="outlined"
              label="Enter amount of your offer"
              value={offerAmount}
              onChange={handleOfferAmountChange}
            />
            {/* source: https://mui.com/material-ui/react-select/ */}
            <FormControl sx={{ width: 120 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Currency</InputLabel>
              <Select
                label="Exchange Type"
                value={offerCurrency}
                onChange={handleOfferCurrencyChange}
                autoWidth
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"LBP"}>LBP</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="form-row">
          <div>
            <Typography variant="subtitle4" align="center" className="currency-label request-label">
              I want:
            </Typography>
          </div>
          <div className="input-container">
            <TextField
              className="request-textfield"
              variant="outlined"
              label="Enter amount requested"
              value={requestAmount}
              onChange={handleRequestAmountChange}
            />
            <Typography
              variant="subtitle4"
              align="center"
              className="currency-label request-other-currency"
            >
              {requestCurrency}
            </Typography>
          </div>
        </div>

        <div className="offer-button-row">
          <Button
            className="record-transaction-button"
            variant="contained"
            size="large"
            onClick={handleOfferButtonClick}
          >
            Offer
          </Button>
          <Button
            className="record-transaction-button"
            variant="contained"
            size="large"
            onClick={handleClearButtonClick}
          >
            Clear
          </Button>
        </div>
      </div>
    </>
  );
}

export default OfferTransaction;
