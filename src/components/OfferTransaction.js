import React, { useState } from "react";
import "../css/offerTransaction.css";
import { transactionType } from "../enums/transactionType";
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

    if (offerCurrency === "USD") {
      setRequestCurrency("USD");
    } else {
      setRequestCurrency("LBP");
    }
  }

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
    onSubmit(recipientUsername, offerAmount, requestAmount, offerCurrency);
  }

  function handleClearButtonClick() {
    setRecipientUsername("");
    setOfferAmount("");
    setRequestAmount("");
    setOfferCurrency("");
    setRequestCurrency("");
  }

  function closeAlert() {
    setMissingInput(false);
    setNonNumericInput(false);
  }

  return (
    <>
      {/* Alerts inspired by the frontend lab from class */}
      <SnackbarAlert
        open={missingInput}
        message="Please fill in all inputs before submitting the form."
        onClose={closeAlert}
        severity="error"
      />
      <SnackbarAlert
        open={nonNumericInput}
        message="Please only input positive numbers."
        onClose={closeAlert}
        severity="error"
      />

      <div className="username-row">
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
        <TextField
          className="request-textfield"
          variant="outlined"
          label="Enter amount of your offer"
          value={offerAmount}
          onChange={handleOfferAmountChange}
        />
        <FormControl sx={{ minWidth: 120 }}>
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

      <div className="form-row">
        <div>
          <Typography variant="subtitle4" align="center" className="currency-label request-label">
            I want:
          </Typography>
        </div>
        <TextField
          className="request-textfield"
          variant="outlined"
          label="Enter amount of your offer"
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

      {/* source for drop-down menu: https://mui.com/material-ui/react-select/ */}
      <div className="menu-row"></div>
      <div className="button-row">
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
    </>
  );
}

export default OfferTransaction;
