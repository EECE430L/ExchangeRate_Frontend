import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { transactionType } from "../enums/transactionType.js";

function ConvertCalculator() {
    const [usdValue, setUsdValue] = useState("");
    const [lbpValue, setLbpValue] = useState("");
    const [conversionType, setConversionType] = useState(
        transactionType.UsdToLbp
    );

    const handleUsdChange = (event) => {
        setUsdValue(event.target.value);
    };

    const handleLbpChange = (event) => {
        setLbpValue(event.target.value);
    };

    const handleConversionClick = () => {
        if (conversionType === transactionType.UsdToLbp) {
            setLbpValue(parseFloat(usdValue) * 1500);
        } else {
            setUsdValue(parseFloat(lbpValue) / 1500);
        }
    };

    const handleSwapClick = () => {
        if (conversionType === transactionType.UsdToLbp) {
            setConversionType(transactionType.LbpToUsd);
        } else {
            setConversionType(transactionType.UsdToLbp);
        }
    };

    const fromLabel =
        conversionType === transactionType.UsdToLbp ? "USD" : "LBP";
    const toLabel =
        conversionType === transactionType.UsdToLbp ? "LBP" : "USD";

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={4}>
                        <TextField
                            label={`Amount (${fromLabel})`}
                            variant="outlined"
                            fullWidth
                            value={
                                conversionType === transactionType.UsdToLbp ? usdValue : lbpValue
                            }
                            onChange={
                                conversionType === transactionType.UsdToLbp
                                    ? handleUsdChange
                                    : handleLbpChange
                            }
                        />
                    </Grid>
                    <Grid item xs={1} style={{marginTop: "30px"}}>
                        <Button variant="outlined" onClick={handleSwapClick}>
                            <SwapHorizIcon />
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label={`Amount (${toLabel})`}
                            variant="outlined"
                            fullWidth
                            value={
                                conversionType === transactionType.UsdToLbp ? lbpValue : usdValue
                            }
                            onChange={
                                conversionType === transactionType.UsdToLbp
                                    ? handleLbpChange
                                    : handleUsdChange
                            }
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} align="center">
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleConversionClick}
                >
                    Convert
                </Button>
            </Grid>
        </Grid>
    );
}

export default ConvertCalculator;
