import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { transactionType } from "../enums/transactionType.js";
import "../css/convertCalculator.css";
import usaFlag from "../media/usaFlag.png";
import lebanonFlag from "../media/lebanonFlag.png";
import SnackbarAlert from "./SnackbarAlert";

function ConvertCalculator({ usdToLbpRate, lbpToUsdRate }) {
  let [flagLeft, setFlagLeft] = useState(usaFlag);
  let [altLeft, setAltLeft] = useState("USAFlag");
  let [currencyLeft, setCurrencyLeft] = useState("USD");
  let [flagRight, setFlagRight] = useState(lebanonFlag);
  let [altRight, setAltRight] = useState("LebFlag");
  let [currencyRight, setCurrencyRight] = useState("LBP");
  let [convertValue, setConvertValue] = useState("");
  let [resultValue, setResultValue] = useState("");
  let [conversionType, setConversionType] = useState(transactionType.UsdToLbp);
  let [nonNumericInput, setNonNumericInput] = useState(false);
  let [announceSwitchConversion, setAnnounceSwitchConversion] = useState("");
  let [announceConversionResult, setAnnounceConversionResult] = useState("");

  //source: https://stackoverflow.com/questions/58584258/too-many-re-renders-with-react-hooks
  useEffect(() => {
    if (conversionType === transactionType.LbpToUsd) {
      setFlagLeft(lebanonFlag);
      setAltLeft("LebFlag");
      setCurrencyLeft("LBP");
      setFlagRight(usaFlag);
      setAltRight("USAFlag");
      setCurrencyRight("USD");
    } else {
      setFlagLeft(usaFlag);
      setAltLeft("USAFlag");
      setCurrencyLeft("USD");
      setFlagRight(lebanonFlag);
      setAltRight("LebFlag");
      setCurrencyRight("LBP");
    }
  }, [conversionType]);

  const handleSwitchConversionClick = () => {
    if (conversionType === transactionType.UsdToLbp) {
      setConversionType(transactionType.LbpToUsd);
      setAnnounceSwitchConversion("Now converting LBP to USD");
    } else {
      setConversionType(transactionType.UsdToLbp);
      setAnnounceSwitchConversion("Now converting USD to LBP");
    }
    setConvertValue("");
    setResultValue("");
  };

  const handleConvertValueChange = (event) => {
    setConvertValue(event.target.value);
  };

  const handleConvertClick = () => {
    if (!convertValue.trim()) {
      return;
    }
    const numericRegex = /^\d+(\.\d+)?$/;
    if (!numericRegex.test(convertValue)) {
      setNonNumericInput(true);
      return;
    }
    if (conversionType === transactionType.UsdToLbp) {
      if (usdToLbpRate == "0") {
        setResultValue("Rate not available at this time");
        setAnnounceConversionResult("USD rate not available at this time to make the conversion");
      } else {
        const result = (parseFloat(convertValue) * usdToLbpRate).toString();
        setResultValue(result);
        setAnnounceConversionResult(
          `Your conversion result: ${convertValue} USD equals ${result} LBP.`
        );
      }
    } else {
      if (lbpToUsdRate === "0") {
        setResultValue("Rate not available at this time");
        setAnnounceConversionResult("LBP rate not available at this time to make the conversion");
      } else {
        const result = (parseFloat(convertValue) / lbpToUsdRate).toString();
        setResultValue(result);
        setAnnounceConversionResult(
          `Your conversion result: ${convertValue} LBP equals ${result} USD.`
        );
      }
    }
  };

  const handleClearClick = () => {
    setConvertValue("");
    setResultValue("");
  };

  function closeErrorAlert() {
    setNonNumericInput(false);
  }

  return (
    <>
      <SnackbarAlert
        open={nonNumericInput}
        message="Please only input positive numbers."
        onClose={closeErrorAlert}
        severity="error"
      />
      {/* source: https://mui.com/material-ui/react-grid/ */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Grid
            container
            spacing={0}
            justifyContent="space-around"
            sx={{ "& > *": { margin: "1vw" } }}
          >
            <Grid item xs={4} margin-left="20px">
              <Typography variant="subtitle1" align="center" className="currency-label">
                {currencyLeft}
                <img src={flagLeft} className="flag-converter" alt={altLeft} />
              </Typography>
              <TextField
                variant="outlined"
                className="amount-textfield"
                placeholder="Enter amount to convert"
                value={convertValue}
                onChange={handleConvertValueChange}
              />
            </Grid>
            <Grid item xs={1} style={{ padding: 0 }}>
              <Button
                aria-label={announceSwitchConversion}
                variant="outlined"
                onClick={handleSwitchConversionClick}
                className={"switch-conversion-button"}
              >
                <SwapHorizIcon />
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle1" align="center" className="currency-label">
                {currencyRight}
                <img src={flagRight} className="flag-converter" alt={altRight} />
              </Typography>
              <TextField
                variant="outlined"
                className="amount-textfield"
                placeholder="Result"
                InputProps={{
                  readOnly: true,
                }}
                value={resultValue}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            aria-label={announceConversionResult}
            className="convert-button"
            variant="contained"
            size="large"
            onClick={handleConvertClick}
            style={{ marginRight: "10px" }}
          >
            Convert
          </Button>
          <Button
            className="convert-button"
            variant="contained"
            size="large"
            onClick={handleClearClick}
            style={{ marginLeft: "10px" }}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default ConvertCalculator;
