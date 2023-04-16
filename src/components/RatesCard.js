import React from "react";
import { useState, useEffect } from "react";
import "../css/ratesCard.css";
import usaFlag from "../media/usaFlag.png";
import lebanonFlag from "../media/lebanonFlag.png";
import { transactionType } from "../enums/transactionType.js";

const RatesCard = ({ rate, exchange_direction }) => {
  let [flagLeft, setFlagLeft] = useState(usaFlag);
  let [altLeft, setAltLeft] = useState("USAFlag");
  let [currencyLeft, setCurrencyLeft] = useState("USD");
  let [exchangeRate, setExchangeRate] = useState(rate)
  let [flagRight, setFlagRight] = useState(lebanonFlag);
  let [altRight, setAltRight] = useState("LebFlag");
  let [currencyRight, setCurrencyRight] = useState("LBP");

    //source: https://stackoverflow.com/questions/58584258/too-many-re-renders-with-react-hooks
    useEffect(() => {
        if (exchange_direction === transactionType.LbpToUsd) {
            setFlagLeft(lebanonFlag);
            setAltLeft("LebFlag");
            setCurrencyLeft("LBP");

            setFlagRight(usaFlag);
            setAltRight("USAFlag");
            setCurrencyRight("USD");
        } else {
            setFlagLeft(usaFlag);
            setAltLeft("USAFlag");
            setCurrencyLeft("USD");

            setFlagRight(lebanonFlag);
            setAltRight("LebFlag");
            setCurrencyRight("LBP");
        }
    }, [exchange_direction]);

    useEffect(() => {
        if (rate === "0") {
            setExchangeRate("Not available")
        }
    }, [rate]);

  return (
    <div className="rates-card">
      <div className="rates-card-header">
        <h2 className="remove-whitespace">{currencyLeft} &#8594; {currencyRight}</h2>
      </div>
      <div>
        <img className="flag flagLeft"
          src={flagLeft}
          alt="USA"
          style={{ horizontalAlign: "left" }}
        />
        <img className="flag flagRight"
          src={flagRight}
          alt="Leb"
          style={{ horizontalAlign: "right" }}
        />
      </div>
      <div className="rates-card-body">
        <p>{exchangeRate}</p>
      </div>
    </div>
  );
};

export default RatesCard;
