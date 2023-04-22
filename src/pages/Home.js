import React from "react";
import { useState, useEffect } from "react";
import RateCard from "../components/RateCard";
import ConvertCalculator from "../components/ConvertCalculator";
import { transactionType } from "../enums/transactionType.js";
import "../css/home.css";
import { baseUrl } from "../config/Config.js";

function Home() {
  let [buyUsdRate, setBuyUsdRate] = useState("Not available");
  let [sellUsdRate, setSellUsdRate] = useState("Not available");

  //API call in useEffect to ensure that exchange rates fetched before component is rendered
  useEffect(() => {
    async function fetchExchangeRates() {
      try {
        const response = await fetch(`${baseUrl}/exchangeRate`);
        const data = await response.json();
        setBuyUsdRate(data.lbp_to_usd);
        setSellUsdRate(data.usd_to_lbp);
      } catch (error) {
        console.error(error);
      }
    }
    fetchExchangeRates();
  }, []);

  return (
    <div>
      <div>
        <h2 className="home-card-rates-title home-card-title">Today's Exchange Rates</h2>
      </div>
      <div className="home-card home-card-rates">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span style={{ margin: "0 10px" }}>
            <RateCard
              className="rate-card"
              rate={sellUsdRate}
              isQuantity={false}
              exchange_direction={transactionType.UsdToLbp}
            />
          </span>
          <span style={{ margin: "0 10px" }}>
            <RateCard
              className="rate-card"
              rate={buyUsdRate}
              isQuantity={false}
              exchange_direction={transactionType.LbpToUsd}
            />
          </span>
        </div>
      </div>

      <h2 className="home-card-title home-card-converter-title">Currency Converter</h2>
      <div className="home-card home-card-converter">
        <ConvertCalculator usdToLbpRate={sellUsdRate} lbpToUsdRate={buyUsdRate} />
      </div>
    </div>
  );
}

export default Home;
