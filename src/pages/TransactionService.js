import React, {useState} from 'react';
import "../css/transactionService.css"
import RecordTransaction from "../components/RecordTransaction.js"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { transactionType } from "../enums/transactionType.js";

function TransactionService() {
    let [usdAmountRecordTransaction, setUsdAmountRecordTransaction] = useState(null);
    let [lbpAmountRecordTransaction, setLbpAmountRecordTransaction] = useState(null);
    let [exchangeTypeRecordTransaction, setExchangeTypeRecordTransaction] = useState(null);


    //to make an API call in this file when a button is clicked in the RecordTransaction component,
    //I learned that I can define a function here and pass it as a prop to the component, and call the function when the button
    //is clicked. I used these links as a source:
    //https://stackoverflow.com/questions/48367998/passing-event-and-props-from-child-to-parent-in-react
    //https://stackoverflow.com/questions/60915262/how-to-pass-function-as-props-from-functional-parent-component-to-child
    function handleRecordTransactionSubmit(usdAmount, lbpAmount, exchangeType) {
        setUsdAmountRecordTransaction(usdAmount);
        setLbpAmountRecordTransaction(lbpAmount);
        setExchangeTypeRecordTransaction(exchangeType);
    }


    return (
        //source: https://dev.to/dawnind/3-ways-to-display-two-divs-side-by-side-3d8b#:~:text=The%20most%20common%20way%20to,using%20inline%2Dblock%20css%20property.&text=The%20inline%2Dblock%20property%20on,like%20an%20inline%20element%20does
        //I used the above source to find an organized way to place 2 cards side by side and taking up the whole page

        //source: https://mui.com/material-ui/react-select/
        //I used the above source to design the drop down menu
        <div className="flex-parent-element">
            <div className="flex-child-element">
                <div className="header">
                    <h1>Record an Exchange</h1>
                </div>
                <div className="flex-child-body">
                    <p className="record-transaction-instructions">
                        To record an exchange you made, please input the amounts of each currency that were
                        exchanged in your transaction. Then, select the type of the exchange.
                    </p>
                    <RecordTransaction onSubmit={handleRecordTransactionSubmit}/>

                </div>
            </div>
            <div className="flex-child-element">
                <div className="header">
                    <h1>Request Transaction from User</h1>
                </div>
                <div className="flex-child-body">
                    test
                </div>
            </div>
        </div>
    );
}

export default TransactionService;
