import React, { useEffect, useState } from "react";
import "../css/recordTransaction.css";
import usaFlag from "../media/usaFlag.png";
import lebanonFlag from "../media/lebanonFlag.png";
import { transactionType } from "../enums/transactionType";
import {
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import SnackbarAlert from "../components/SnackbarAlert";

function RecordTransaction({ onSubmit }) {
  let [usdAmount, setUsdAmount] = useState("");
  let [lbpAmount, setLbpAmount] = useState("");
  let [exchangeType, setExchangeType] = useState("");
  let [usdToLbp, setUsdToLbp] = useState();
  let [missingInput, setMissingInput] = useState(false);
  let [nonNumericInput, setNonNumericInput] = useState(false);

  function handleUsdAmountChange(event) {
    setUsdAmount(event.target.value);
  }
  function handleLbpAmountChange(event) {
    setLbpAmount(event.target.value);
  }
  function handleExchangeTypeChange(event) {
    setExchangeType(event.target.value);
  }

  useEffect(() => {
    if (exchangeType == transactionType.UsdToLbp) {
      setUsdToLbp(true);
    } else {
      setUsdToLbp(false);
    }
  }, [exchangeType]);

  function handleSubmitButtonClick() {
    if (!usdAmount || !lbpAmount || !exchangeType) {
      setMissingInput(true);
      return;
    }
    //define a numeric regular expression with optional decimal to compare against the inputs
    //source: https://stackoverflow.com/questions/10023845/regex-in-javascript-for-validating-decimal-numbers
    const numericRegex = /^\d+(\.\d+)?$/;
    if (!numericRegex.test(usdAmount) || !numericRegex.test(lbpAmount)) {
      setNonNumericInput(true);
      return;
    }
    //call the passed API function from ExchangeService on the selected values
    onSubmit(parseFloat(usdAmount), parseFloat(lbpAmount), usdToLbp);
  }

  function handleClearButtonClick() {
    setUsdAmount("");
    setLbpAmount("");
    setExchangeType("");
    setUsdToLbp();
  }

  function closeAlert() {
    setMissingInput(false);
    setNonNumericInput(false);
  }

  return (
    <>
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

      <div className="currency-row">
        <div>
          <Typography variant="subtitle1" align="center" className="currency-label">
            USD
            <img src={usaFlag} className="flag-converter" alt={"USAFlag"} />
          </Typography>
        </div>
        <div>
          <TextField
            variant="outlined"
            className="amount-textfield"
            fullWidth
            label="Enter amount of USD in exchange"
            value={usdAmount}
            onChange={handleUsdAmountChange}
          />
        </div>
      </div>

      <div className="currency-row">
        <div>
          <Typography variant="subtitle1" align="center" className="currency-label">
            LBP
            <img src={lebanonFlag} className="flag-converter" alt="LebFlag" />
          </Typography>
        </div>
        <div>
          <TextField
            variant="outlined"
            className="amount-textfield"
            fullWidth
            label="Enter amount of LBP in exchange"
            value={lbpAmount}
            onChange={handleLbpAmountChange}
          />
        </div>
      </div>

      {/* source for drop-down menu: https://mui.com/material-ui/react-select/ */}
      <div className="menu-row">
        <FormControl sx={{ m: 1, minWidth: 160 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Exchange Type</InputLabel>
          <Select
            label="Exchange Type"
            value={exchangeType}
            onChange={handleExchangeTypeChange}
            autoWidth
          >
            <MenuItem value={transactionType.UsdToLbp}>USD to LBP</MenuItem>
            <MenuItem value={transactionType.LbpToUsd}>LBP to USD</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="button-row">
        <Button
          className="record-transaction-button"
          variant="contained"
          size="large"
          onClick={handleSubmitButtonClick}
        >
          Submit
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

export default RecordTransaction;
