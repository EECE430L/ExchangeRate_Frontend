import React from "react";
import { useState, useEffect } from "react";
import "../css/ratesCard.css";
import usaFlag from "../media/usaFlag.png";
import lebanonFlag from "../media/lebanonFlag.png";
import { transactionType } from "../enums/transactionType.js";

const RatesCard = ({ rate, transaction_type }) => {
  let [flagLeft, setFlagLeft] = useState(usaFlag);
  let [altLeft, setAltLeft] = useState("USAFlag");
  let [currencyLeft, setCurrencyLeft] = useState("USD");

  let [flagRight, setFlagRight] = useState(lebanonFlag);
  let [altRight, setAltRight] = useState("LebFlag");
  let [currencyRight, setCurrencyRight] = useState("LBP");



    //source: https://stackoverflow.com/questions/58584258/too-many-re-renders-with-react-hooks
    useEffect(() => {
        if (transaction_type === transactionType.BuyUSD) {
            setFlagLeft(lebanonFlag);
            setAltLeft("LebFlag");
            setCurrencyLeft("LBP");

            setFlagRight(usaFlag);
            setAltRight("USAFlag");
            setCurrencyRight("USD");
        }
    }, [transaction_type]);


  return (
    <div className="exchange-card">
      <div className="exchange-card-header">
        <h2 class="remove-whitespace">{currencyLeft} &#8594; {currencyRight}</h2>
      </div>
      <div>
        <img
          src={flagLeft}
          alt="USA"
          className="flag"
          style={{ horizontalAlign: "left" }}
        />
        <img
          src={flagRight}
          alt="Leb"
          className="flag"
          style={{ horizontalAlign: "right" }}
        />
      </div>
      <div className="exchange-card-body">
        <p>{rate}</p>
      </div>
    </div>
  );
};

export default RatesCard;
