import React from "react";
import "../css/statistics.css";
import { useState, useEffect } from "react";
import RateGraph from "../components/RateGraph";
import PercentChange from "../components/PercentChange";
import RateCard from "../components/RateCard";
import Calender from "../components/Calender";
import { transactionType } from "../enums/transactionType.js";
import { baseUrl } from "../config/Config";
import { Button } from "@mui/material";

function Statistics(props) {
  let [numberTransactionsBuyUsd, setNumberTransactionsBuyUsd] =
    useState("Not available");
  let [numberTransactionsSellUsd, setNumberTransactionsSellUsd] =
    useState("Not available");
  let [buyPercentChange, setBuyPercentChange] = useState(0);
  let [sellPercentChange, setSellPercentChange] = useState(0);
  let [fluctuationsUsdLbp, setFluctuationsUsdLbp] = useState([]);
  let [fluctuationsLbpUsd, setFluctuationsLbpUsd] = useState([]);
  let [startDate, setStartDate] = useState(null);
  let [endDate, setEndDate] = useState(null);
  const [width, setWidth] = useState(620);
  const [height, setHeight] = useState(500);

  function handleStartDateChange(date) {
    setStartDate(date);
  }

  function handleEndDateChange(date) {
    setEndDate(date);
  }

  async function handleRenderGraphButtonClick() {
    if (!startDate || !endDate) {
      return;
    }
    await fetchFluctuationUsdLbp(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate(),
      endDate.getFullYear(),
      endDate.getMonth() + 1,
      endDate.getDate()
    );
    await fetchFluctuationLbpUsd(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate(),
      endDate.getFullYear(),
      endDate.getMonth() + 1,
      endDate.getDate()
    );
  }

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

  async function fetchPercentChange() {
    try {
      const response = await fetch(
        `${baseUrl}/statistics/rates-percent-change`
      );
      const data = await response.json();
      setBuyPercentChange(data.percent_change_LBP_to_USD);
      setSellPercentChange(data.percent_change_USD_to_LBP);
    } catch (error) {
      console.error(error);
    }
  }

  //source: https://stackoverflow.com/questions/37230555/get-with-query-string-with-fetch-in-react-native
  async function fetchFluctuationUsdLbp(
    startYear,
    startMonth,
    startDay,
    endYear,
    endMonth,
    endDay
  ) {
    try {
      const url = `${baseUrl}/fluctuations/usd-to-lbp?startYear=${startYear}&startMonth=${startMonth}&startDay=${startDay}&endYear=${endYear}&endMonth=${endMonth}&endDay=${endDay}`;
      const response = await fetch(url);
      const data = await response.json();

      //source: https://stackoverflow.com/questions/63820286/fetch-request-in-react-how-do-i-map-through-json-array-of-object-inside-of-arra
      const listData = data.map((rateDay) => ({
        date: rateDay.StartDate,
        rate:
          rateDay.usdToLbpRate === "No Data Available"
            ? null
            : parseFloat(rateDay.usdToLbpRate),
      }));

      setFluctuationsUsdLbp(listData);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchFluctuationLbpUsd(
    startYear,
    startMonth,
    startDay,
    endYear,
    endMonth,
    endDay
  ) {
    try {
      const url = `${baseUrl}/fluctuations/lbp-to-usd?startYear=${startYear}&startMonth=${startMonth}&startDay=${startDay}&endYear=${endYear}&endMonth=${endMonth}&endDay=${endDay}`;
      const response = await fetch(url);
      const data = await response.json();

      const listData = data.map((rateDay) => ({
        date: rateDay.StartDate,
        rate:
          rateDay.lbpToUsdRate === "No Data Available"
            ? null
            : parseFloat(rateDay.lbpToUsdRate),
      }));

      setFluctuationsLbpUsd(listData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPercentChange();
    fetchNumberTransactions();
  }, []);

  // I wanted to set the width and height property of the graph based on the size of the wrapper-content div
  // since LineChart expects fixed values for the dimensions, so I could not use simple CSS,
  // so I used ChatGPT to learn how to get the size of the div and add an event listener to resize it
  useEffect(() => {
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

  return (
    <div className="wrapper">
      <div className="header">
        <h1>Statistics</h1>
      </div>

      <div className="wrapper-content">
        <h2 className="section-title">24-Hour Exchange Rates Percent Change</h2>
        <PercentChange
          buyPercentChange={buyPercentChange}
          sellPercentChange={sellPercentChange}
        />
        <hr />

        <h2 className="section-title">
          Number of Transactions in the Last 24 Hours
        </h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span style={{ margin: "0 10px" }}>
            <RateCard
              className="rate-card"
              rate={numberTransactionsSellUsd}
              isQuantity={true}
              exchange_direction={transactionType.UsdToLbp}
            />
          </span>
          <span style={{ margin: "0 10px" }}>
            <RateCard
              className="rate-card"
              rate={numberTransactionsBuyUsd}
              isQuantity={true}
              exchange_direction={transactionType.LbpToUsd}
            />
          </span>
        </div>
        <hr />

        <h2 className="section-title">
          Exchange Rates vs. Time Over Last Month
        </h2>
        <RateGraph
          className="rates-graph"
          buyData={fluctuationsLbpUsd}
          sellData={fluctuationsUsdLbp}
          width={width}
          height={height}
        />

        <div className="calender-row">
          <div style={{ marginRight: "20px" }}>
            <p>Select Start Date:</p>
            <Calender onDateChange={handleStartDateChange} />
          </div>
          <div>
            <p>Select End Date:</p>
            <Calender onDateChange={handleEndDateChange} />
          </div>
        </div>
        <Button
          className="render-graph-button"
          onClick={handleRenderGraphButtonClick}
        >
          Render Graph
        </Button>
      </div>
    </div>
  );
}

export default Statistics;
