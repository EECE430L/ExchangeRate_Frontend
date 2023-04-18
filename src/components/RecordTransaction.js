import React, {useEffect, useState} from 'react';
import { TextField, Typography } from '@mui/material';
import "../css/recordTransaction.css"
import usaFlag from "../media/usaFlag.png";
import lebanonFlag from "../media/lebanonFlag.png";
import {transactionType} from "../enums/transactionType";


function RecordTransaction() {
    let [usdAmount, setUsdAmount] = useState(null);
    let [lbpAmount, setLbpAmount] = useState(null);


    return (
    <>
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
                placeholder="Enter amount of USD in transaction"
                value={usdAmount}
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
                    placeholder="Enter amount of LBP in transaction"
                    value={lbpAmount}
                />
            </div>
        </div>
    </>
    );
}

export default RecordTransaction;
