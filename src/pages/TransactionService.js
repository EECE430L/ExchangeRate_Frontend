import React from "react";
import "../css/transactionService.css"
import RecordTransaction from "../components/RecordTransaction.js"

function TransactionService() {
    return (
        //source: https://dev.to/dawnind/3-ways-to-display-two-divs-side-by-side-3d8b#:~:text=The%20most%20common%20way%20to,using%20inline%2Dblock%20css%20property.&text=The%20inline%2Dblock%20property%20on,like%20an%20inline%20element%20does
        //I used the above source to find an organized way to place 2 cards side by side and taking up the whole page
        <div className="flex-parent-element">
            <div className="flex-child-element">
                <div className="header">
                    <h1>Record a Transaction</h1>
                </div>
                <div className="flex-child-body">
                    <RecordTransaction/>
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
