import React, {useEffect, useState} from 'react';
import "../css/recordTransaction.css"
import usaFlag from "../media/usaFlag.png";
import lebanonFlag from "../media/lebanonFlag.png";
import {transactionType} from "../enums/transactionType";
import {
    Button,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    Snackbar } from "@mui/material";


function RecordTransaction({handleRecordTransactionSubmit}) {
    let [usdAmount, setUsdAmount] = useState('');
    let [lbpAmount, setLbpAmount] = useState('');
    let [exchangeType, setExchangeType] = useState('');
    const [missingInput, setMissingInput] = useState(false);

    function handleUsdAmountChange(event) { setUsdAmount(event.target.value); }
    function handleLbpAmountChange(event) { setLbpAmount(event.target.value); }
    function handleExchangeTypeChange(event) { setExchangeType(event.target.value); }

    function handleSubmitButtonClick() {
        if (!usdAmount || !lbpAmount || !exchangeType) {
            setMissingInput(true)
            return;
        }
        handleRecordTransactionSubmit(usdAmount, lbpAmount, exchangeType);
    }

    function handleClearButtonClick() {
        setUsdAmount("");
        setLbpAmount("");
        setExchangeType("");
    }

    function closeAlert() {
        setMissingInput(false);
    };


    return (
    <>
        <Snackbar
            open={missingInput}
            autoHideDuration={3000}
            onClose={closeAlert}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
            <Alert severity="error">Please fill in all inputs before submitting the form.</Alert>
        </Snackbar>

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
        <div className="menu-row">
            <FormControl sx={{ m: 1, minWidth: 160 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                    Exchange Type
                </InputLabel>
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
