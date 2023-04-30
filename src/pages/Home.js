import React from "react";
import { useState, useEffect, useContext } from "react";
import RateCard from "../components/RateCard";
import ConvertCalculator from "../components/ConvertCalculator";
import { transactionType } from "../enums/transactionType.js";
import "../css/home.css";
import { baseUrl } from "../config/Config.js";
import AuthContext from "../context/AuthContext";
import SnackbarAlert from "../components/SnackbarAlert";

function Home() {
  let [buyUsdRate, setBuyUsdRate] = useState("Not available");
  let [sellUsdRate, setSellUsdRate] = useState("Not available");
  let [showAlert, setShowAlert] = useState(false);
  let [announceRates, setAnnounceRates] = useState("");
  const { accountLoginSuccess, accountCreationSuccess, setAccountLoginSuccess } =
    useContext(AuthContext);

  //API call in useEffect to ensure that exchange rates fetched before component is rendered
  useEffect(() => {
    async function fetchExchangeRates() {
      try {
        const response = await fetch(`${baseUrl}/exchangeRate`);
        const data = await response.json();
        setBuyUsdRate(data.lbp_to_usd);
        setSellUsdRate(data.usd_to_lbp);
        setAnnounceRates(
          `Today's exchange rates are: USD to LBP: ${
            data.lbp_to_usd !== 0 ? data.lbp_to_usd : "Not available"
          } and LBP to USD: ${data.usd_to_lbp !== 0 ? data.usd_to_lbp : "Not available"}`
        );
      } catch (error) {
        console.error(error);
      }
    }
    fetchExchangeRates();
  }, []);

  function closeLoginAlert() {
    setAccountLoginSuccess(false);
  }

  useEffect(() => {
    setShowAlert(accountLoginSuccess && !accountCreationSuccess);
  }, [accountLoginSuccess, accountCreationSuccess]);

  return (
    <div>
      <SnackbarAlert
        open={showAlert}
        message="Successfully logged in."
        onClose={closeLoginAlert}
        severity="success"
      />
      <div>
        <h2 className="home-card-rates-title home-card-title">Today's Exchange Rates</h2>
      </div>
      <div className="home-card home-card-rates" aria-label={announceRates}>
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
