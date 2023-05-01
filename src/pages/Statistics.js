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
import SnackbarAlert from "../components/SnackbarAlert";

function Statistics(props) {
  let [numberTransactionsBuyUsd, setNumberTransactionsBuyUsd] = useState("Not available");
  let [numberTransactionsSellUsd, setNumberTransactionsSellUsd] = useState("Not available");
  let [buyPercentChange, setBuyPercentChange] = useState(0);
  let [sellPercentChange, setSellPercentChange] = useState(0);
  let [fluctuationsData, setFluctuationsData] = useState([]);
  let [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  let [endDate, setEndDate] = useState(new Date());
  let [invalidDates, setInvalidDates] = useState(false);
  let [showDateErrorAlert, setShowDateErrorAlert] = useState(false);
  const [width, setWidth] = useState(620);
  const [height, setHeight] = useState(500);
  let [announceNumberTransactions, setAnnounceNumberTransactions] = useState("");

  function handleStartDateChange(date) {
    setStartDate(date);
  }

  function handleEndDateChange(date) {
    setEndDate(date);
  }

  useEffect(() => {
    if (startDate != null && endDate != null) {
      if (startDate >= endDate) {
        setInvalidDates(true);
      } else {
        setInvalidDates(false);
      }
    }
  }, [startDate, endDate]);

  async function getStatistics() {
    fetchPercentChange(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate(),
      endDate.getFullYear(),
      endDate.getMonth() + 1,
      endDate.getDate()
    );
    fetchNumberTransactions(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate(),
      endDate.getFullYear(),
      endDate.getMonth() + 1,
      endDate.getDate()
    );
    fetchFluctuations(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate(),
      endDate.getFullYear(),
      endDate.getMonth() + 1,
      endDate.getDate()
    );
  }

  useEffect(() => {
    (async () => {
      await getStatistics();
    })();
  }, []);

  async function handleGetStatisticsButtonClick() {
    if (!startDate || !endDate) {
      return;
    }
    if (invalidDates) {
      setShowDateErrorAlert(true);
      return;
    }
    await getStatistics();
  }

  async function fetchNumberTransactions(
    startYear,
    startMonth,
    startDay,
    endYear,
    endMonth,
    endDay
  ) {
    try {
      const response = await fetch(
        `${baseUrl}/statistics/number-transactions?startYear=${startYear}&startMonth=${startMonth}&startDay=${startDay}&endYear=${endYear}&endMonth=${endMonth}&endDay=${endDay}`
      );
      const data = await response.json();
      setNumberTransactionsBuyUsd(data.num_lbp_to_usd_transactions);
      setNumberTransactionsSellUsd(data.num_usd_to_lbp_transactions);
      setAnnounceNumberTransactions(
        `Between ${startDate.toLocaleDateString()} and ${endDate.toLocaleDateString()} there were ${
          data.num_usd_to_lbp_transactions
        } USD to LBP transactions made, and ${
          data.num_lbp_to_usd_transactions
        } LBP to USD transactions made`
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchPercentChange(startYear, startMonth, startDay, endYear, endMonth, endDay) {
    try {
      const response = await fetch(
        `${baseUrl}/statistics/rates-percent-change?startYear=${startYear}&startMonth=${startMonth}&startDay=${startDay}&endYear=${endYear}&endMonth=${endMonth}&endDay=${endDay}`
      );
      const data = await response.json();
      setBuyPercentChange(data.percent_change_LBP_to_USD);
      setSellPercentChange(data.percent_change_USD_to_LBP);
    } catch (error) {
      console.error(error);
    }
  }

  //source: https://stackoverflow.com/questions/37230555/get-with-query-string-with-fetch-in-react-native
  async function fetchFluctuations(startYear, startMonth, startDay, endYear, endMonth, endDay) {
    try {
      const url = `${baseUrl}/fluctuations?startYear=${startYear}&startMonth=${startMonth}&startDay=${startDay}&endYear=${endYear}&endMonth=${endMonth}&endDay=${endDay}`;
      const response = await fetch(url);
      const data = await response.json();

      //source: https://stackoverflow.com/questions/63820286/fetch-request-in-react-how-do-i-map-through-json-array-of-object-inside-of-arra
      const listData = data.map((rateDay) => ({
        date: rateDay.Date,
        buyRate:
          rateDay.lbpToUsdRate === "No Data Available" ? null : parseFloat(rateDay.lbpToUsdRate),
        sellRate:
          rateDay.usdToLbpRate === "No Data Available" ? null : parseFloat(rateDay.usdToLbpRate),
      }));

      setFluctuationsData(listData);
    } catch (error) {
      console.error(error);
    }
  }

  // I wanted to set the width and height property of the graph based on the size of the wrapper-content div
  // since LineChart expects fixed values in px for the dimensions, so I could not use simple CSS,
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

  function closeErrorAlert() {
    setShowDateErrorAlert(false);
  }

  return (
    <>
      <SnackbarAlert
        open={showDateErrorAlert}
        message="Please ensure the end date is after the start date."
        onClose={closeErrorAlert}
        severity="error"
      />
      <div className="wrapper statistics-wrapper-height">
        <div className="header">
          <h1>Statistics</h1>
        </div>

        <div className="wrapper-content">
          <h2 className="section-title">Choose a Time Frame</h2>
          <p className="my-exchanges-instructions">
            Choose a start and end date for the time frame of the statistics.
          </p>
          <div className="calender-row">
            <div style={{ marginRight: "20px" }}>
              <p>Select Start Date:</p>
              <Calender initialize={startDate} onDateChange={handleStartDateChange} />
            </div>
            <div>
              <p>Select End Date:</p>
              <Calender initialize={endDate} onDateChange={handleEndDateChange} />
            </div>
          </div>
          <Button className="get-statistics-button" onClick={handleGetStatisticsButtonClick}>
            Get Statistics
          </Button>
          <hr />
          <h2 className="section-title">Exchange Rates Percent Change</h2>
          <PercentChange
            buyPercentChange={buyPercentChange}
            sellPercentChange={sellPercentChange}
          />
          <hr />

          <h2 className="section-title">Number of Transactions</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span style={{ margin: "0 10px" }} aria-label={announceNumberTransactions}>
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

          <h2 className="section-title">Exchange Rates vs. Time</h2>
          <RateGraph
            className="rates-graph"
            data={fluctuationsData}
            width={width}
            height={height}
          />
        </div>
      </div>
    </>
  );
}

export default Statistics;
