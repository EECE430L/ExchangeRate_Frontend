import React from 'react';
import "../css/statistics.css";
import { useState, useEffect } from "react";
import RateGraph from "../components/RateGraph";
import PercentChange from "../components/PercentChange"
import RateCard from "../components/RateCard"
import { transactionType } from "../enums/transactionType.js";
import {baseUrl} from "../config/Config";

function Statistics(props) {
    let [numberTransactionsBuyUsd, setNumberTransactionsBuyUsd] = useState("Not available");
    let [numberTransactionsSellUsd, setNumberTransactionsSellUsd] = useState("Not available");
    let [buyUsdPercentChange, setBuyUsdPercentChange] = useState(0);
    let [sellUsdPercentChange, setSellUsdPercentChange] = useState(0);


    const [width, setWidth] = useState(620);
    const [height, setHeight] = useState(500);

    // I wanted to set the width and height property of the graph based on the size of the wrapper-content div
    // since LineChart expects fixed values for the dimensions, so I could not use simple CSS,
    // so I used ChatGPT to learn how to get the size of the div and add an event listener to resize it
    useEffect(() => {
        async function fetchNumberTransactions() {
            try {
                const response = await fetch(`${baseUrl}/statistics/todays-transactions`);
                const data = await response.json();
                setNumberTransactionsBuyUsd(data.num_lbp_to_usd_transactions);
                setNumberTransactionsSellUsd(data.num_usd_to_lbp_transactions);
            } catch (error) {
                console.error(error);
            }
        }
        fetchNumberTransactions();

        async function fetchPercentChange() {
            try {
                const response = await fetch(`${baseUrl}/statistics//rates-percent-change`);
                const data = await response.json();
                setBuyUsdPercentChange(data.percent_change_LBP_to_USD);
                setSellUsdPercentChange(data.percent_change_USD_to_LBP);
            } catch (error) {
                console.error(error);
            }
        }
        fetchPercentChange();

        function handleResize() {
            const wrapperContent = document.querySelector(".wrapper-content");
            setWidth(wrapperContent.clientWidth * 0.9);
            setHeight(wrapperContent.clientHeight * 0.4);
        }
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const buyData = [
        { date: "2022-01-01", rate: 1500 + Math.random() * 500 },
        { date: "2022-02-01", rate: 1600 + Math.random() * 500 },
        { date: "2022-03-01", rate: 1700 + Math.random() * 500 },
        { date: "2022-04-01", rate: 1800 + Math.random() * 500 },
        { date: "2022-05-01", rate: 1900 + Math.random() * 500 },
        { date: "2022-06-01", rate: 2000 + Math.random() * 500 },
        { date: "2022-07-01", rate: 2100 + Math.random() * 500 },
        { date: "2022-08-01", rate: 2200 + Math.random() * 500 },
        { date: "2022-09-01", rate: 2300 + Math.random() * 500 },
        { date: "2022-10-01", rate: 2400 + Math.random() * 500 },
        { date: "2022-11-01", rate: 2500 + Math.random() * 500 },
        { date: "2022-12-01", rate: 2600 + Math.random() * 500 },
    ];

    const sellData = [
        { date: "2022-01-01", rate: 1500 + Math.random() * 500 },
        { date: "2022-02-01", rate: 1600 + Math.random() * 500 },
        { date: "2022-03-01", rate: 1700 + Math.random() * 500 },
        { date: "2022-04-01", rate: 1800 + Math.random() * 500 },
        { date: "2022-05-01", rate: 1900 + Math.random() * 500 },
        { date: "2022-06-01", rate: 2000 + Math.random() * 500 },
        { date: "2022-07-01", rate: 2100 + Math.random() * 500 },
        { date: "2022-08-01", rate: 2200 + Math.random() * 500 },
        { date: "2022-09-01", rate: 2300 + Math.random() * 500 },
        { date: "2022-10-01", rate: 2400 + Math.random() * 500 },
        { date: "2022-11-01", rate: 2500 + Math.random() * 500 },
        { date: "2022-12-01", rate: 2600 + Math.random() * 500 },
    ];

    return (
        <div className="wrapper">
            <div className="header">
                <h1>Statistics</h1>
            </div>

            <div className="wrapper-content">

                <h2 className="section-title">
                    24-Hour Exchange Rates Percent Change
                </h2>
                <PercentChange
                    buyPercentChange={buyUsdPercentChange}
                    sellPercentChange={sellUsdPercentChange}
                />
                <hr />

                <h2 className="section-title">
                    Number of Transactions in the Last 24 Hours
                </h2>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <span style={{ margin: '0 10px' }}>
                        <RateCard className="rate-card"
                                  rate={numberTransactionsSellUsd}
                                  number={true}
                                  exchange_direction={transactionType.UsdToLbp} />
                    </span>
                    <span style={{ margin: '0 10px' }}>
                        <RateCard className="rate-card"
                                  rate={numberTransactionsBuyUsd}
                                  number={true}
                                  exchange_direction={transactionType.LbpToUsd} />
                    </span>
                </div>
                <hr />

                <h2 className="section-title">
                    Exchange Rates vs. Time Over Last Month
                </h2>
                <RateGraph className="rates-graph"
                   buyData={buyData}
                   sellData={sellData}
                   width={width}
                   height={height}
                />
            </div>
        </div>
    );
}

export default Statistics;