import React from 'react';
import "../css/statistics.css";
import { useState, useEffect } from "react";
import RateGraph from "../components/RateGraph";
import PercentChange from "../components/PercentChange"

function Statistics(props) {
    const [width, setWidth] = useState(620);
    const [height, setHeight] = useState(500);

    //source: ChatGPT helped me construct a function that resizes the graph depending on the wrapper-content div size
    //since LineChart expects fixed values for the dimensions, so I could not use simple CSS
    useEffect(() => {
        function handleResize() {
            const wrapperContent = document.querySelector(".wrapper-content");
            setWidth(wrapperContent.clientWidth * 0.9);
            setHeight(wrapperContent.clientHeight * 0.8);
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

    const todayBuyRate = Math.floor(Math.random() * 200 + 1400); // generates a random number between 1400 and 1600
    const yesterdayBuyRate = Math.floor(Math.random() * 200 + 1400);
    const todaySellRate = Math.floor(Math.random() * 200 + 1400);
    const yesterdaySellRate = Math.floor(Math.random() * 200 + 1400);


    return (
        <div className="wrapper">
            <div className="header">
                <h1>Statistics</h1>
            </div>

            <div className="wrapper-content">

                <PercentChange
                    todayBuyRate={todayBuyRate}
                    yesterdayBuyRate={yesterdayBuyRate}
                    todaySellRate={todaySellRate}
                    yesterdaySellRate={yesterdaySellRate}
                />

                <h2 className="graph-title">
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