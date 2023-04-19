import React, {useState} from 'react'
import "../css/transactionService.css"
import RecordTransaction from "../components/RecordTransaction.js"
import UserTransactionsTable from "../components/UserTransactionsTable.js"
import OfferTransaction from "../components/OfferTransaction.js"
import { transactionType } from "../enums/transactionType.js"


function TransactionService() {
    let [usdAmountRecordTransaction, setUsdAmountRecordTransaction] = useState("");
    let [lbpAmountRecordTransaction, setLbpAmountRecordTransaction] = useState("");
    let [exchangeTypeRecordTransaction, setExchangeTypeRecordTransaction] = useState("");

    let [usdAmountOfferTransaction, setUsdAmountOfferTransaction] = useState("");
    let [lbpAmountOfferTransaction, setLbpAmountOfferTransaction] = useState("");
    let [exchangeTypeOfferTransaction, setExchangeTypeOfferTransaction] = useState("");


    const transactions = [
        {
            id: 1,
            exchangedWith: 'Third Party',
            transactionType: 'USD to LBP',
            usdAmount: 100,
            lbpAmount: 150000,
            date: '2022-04-19',
        },
        {
            id: 2,
            exchangedWith: 'Random User 1',
            transactionType: 'LBP to USD',
            usdAmount: 50,
            lbpAmount: 75000,
            date: '2022-04-17',
        },
        {
            id: 3,
            exchangedWith: 'Third Party',
            transactionType: 'LBP to USD',
            usdAmount: 25,
            lbpAmount: 37500,
            date: '2022-04-16',
        },
        {
            id: 4,
            exchangedWith: 'Random User 2',
            transactionType: 'USD to LBP',
            usdAmount: 75,
            lbpAmount: 112500,
            date: '2022-04-15',
        },
        {
            id: 5,
            exchangedWith: 'Third Party',
            transactionType: 'LBP to USD',
            usdAmount: 30,
            lbpAmount: 45000,
            date: '2022-04-14',
        },
        {
            id: 6,
            exchangedWith: 'Random User 3',
            transactionType: 'USD to LBP',
            usdAmount: 20,
            lbpAmount: 30000,
            date: '2022-04-13',
        },
        {
            id: 7,
            exchangedWith: 'Third Party',
            transactionType: 'USD to LBP',
            usdAmount: 200,
            lbpAmount: 300000,
            date: '2022-04-12',
        },
        {
            id: 8,
            exchangedWith: 'Random User 4',
            transactionType: 'LBP to USD',
            usdAmount: 60,
            lbpAmount: 90000,
            date: '2022-04-11',
        },
        {
            id: 9,
            exchangedWith: 'Third Party',
            transactionType: 'USD to LBP',
            usdAmount: 150,
            lbpAmount: 225000,
            date: '2022-04-10',
        },
        {
            id: 10,
            exchangedWith: 'Random User 5',
            transactionType: 'LBP to USD',
            usdAmount: 40,
            lbpAmount: 60000,
            date: '2022-04-09',
        },
        {
            id: 11,
            exchangedWith: 'Third Party',
            transactionType: 'USD to LBP',
            usdAmount: 80,
            lbpAmount: 120000,
            date: '2022-04-08',
        },
        {
            id: 12,
            exchangedWith: 'Random User 6',
            transactionType: 'LBP to USD',
            usdAmount: 15,
            lbpAmount: 22500,
            date: '2022-04-07',
        },
        {
            id: 13,
            exchangedWith: 'Third Party',
            transactionType: 'LBP to USD',
            usdAmount: 10,
            lbpAmount: 15000,
            date: '2022-04-06',
        },
        {
            id: 14,
            exchangedWith:'Random User 7',
            transactionType: 'LBP to USD',
            usdAmount: 10,
            lbpAmount: 15000,
            date: '2022-04-06',
        },
        {
            id: 15,
            exchangedWith:'Random User 8',
            transactionType: 'LBP to USD',
            usdAmount: 10,
            lbpAmount: 15000,
            date: '2022-04-06',
        },
        {
            id: 16,
            exchangedWith:'Last Transaction',
            transactionType: 'LBP to USD',
            usdAmount: 10,
            lbpAmount: 15000,
            date: '2022-04-06',
        }
        ];


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

    function handleOfferTransactionSubmit(offerAmount, requestAmount, offerCurrency) {
        if (offerCurrency === "USD"){
            setUsdAmountOfferTransaction(offerAmount);
            setLbpAmountOfferTransaction(requestAmount);
            setExchangeTypeOfferTransaction(transactionType.UsdToLbp);
        }
        else {
            setUsdAmountOfferTransaction(requestAmount);
            setLbpAmountOfferTransaction(offerAmount);
            setExchangeTypeOfferTransaction(transactionType.LbpToUsd);
        }
    }

    return (
        <>
            {/*source: https://dev.to/dawnind/3-ways-to-display-two-divs-side-by-side-3d8b#:~:text=The%20most%20common%20way%20to,using%20inline%2Dblock%20css%20property.&text=The%20inline%2Dblock%20property%20on,like%20an%20inline%20element%20does*/}
            {/*I used the above source to find an organized way to place 2 cards side by side and taking up the whole page*/}
            <div className="flex-parent-element">
                <div className="flex-child-element">
                    <div className="header">
                        <h1>Record an Exchange</h1>
                    </div>
                    <div className="flex-child-body">
                        <p className="transaction-service-instructions">
                            To record an exchange you made, please input the amounts of each currency that were
                            exchanged in your transaction. Then, select the type of the exchange.
                        </p>
                        <RecordTransaction onSubmit={handleRecordTransactionSubmit}/>
                    </div>
                </div>
                <div className="flex-child-element">
                    <div className="header">
                        <h1>Offer Transaction to User</h1>
                    </div>
                    <div className="flex-child-body">
                        <p className="transaction-service-instructions">
                            To offer a transaction to a user, please input their username, the amount you are offering
                            and in which currency, and the amount you are requesting.
                        </p>
                        <OfferTransaction onSubmit={handleOfferTransactionSubmit} />
                    </div>
                </div>
            </div>
            <div className="wrapper user-transactions-table-container">
                <div className="header">
                    <h1>My Transactions</h1>
                </div>
                <p className="transaction-service-instructions">
                    View your transaction history with external exchange services and other users.
                </p>
                <UserTransactionsTable data={transactions}/>
            </div>
            <div style={{ height: '4vh' }}></div>
        </>
    );
}

export default TransactionService;
