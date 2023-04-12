import React from "react";
import "../css/ratesCard.css";
import usaFlag from "../media/usaFlag.png";
import lebanonFlag from "../media/lebanonFlag.png";

const RatesCard = ({ rate }) => {
  return (
    <div className="exchange-card">
      <div className="exchange-card-header">
        <h2 class="remove-whitespace">USD &#8594; LBP</h2>
      </div>
      <div>
        <img
          src={usaFlag}
          alt="USA"
          className="flag"
          style={{ horizontalAlign: "left" }}
        />
        <img
          src={lebanonFlag}
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
