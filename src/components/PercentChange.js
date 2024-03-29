import React from "react";
import "../css/percentChange.css";

function PercentChange({ buyPercentChange, sellPercentChange }) {
  //return the entire numeric percentage component
  function formatPercentChange(percentChange) {
    if (!percentChange) {
      return (
        <span className={`percent-change zero`}>
          <span>N/A</span>
        </span>
      );
    }

    const formattedPercentChange = percentChange.toFixed(2);

    //select an up or down arrow, classname (for color) and + or - sign
    var percentChangeClassName;
    var arrowSymbol;
    var signSymbol;

    if (formattedPercentChange > 0) {
      percentChangeClassName = "positive";
      arrowSymbol = "\u2191";
      signSymbol = "+";
    } else if (formattedPercentChange < 0) {
      percentChangeClassName = "negative";
      arrowSymbol = "\u2193";
      signSymbol = null;
    } else {
      percentChangeClassName = "zero";
      arrowSymbol = null;
      signSymbol = null;
    }

    return (
      <span className={`percent-change ${percentChangeClassName}`}>
        <span>
          {signSymbol} {formattedPercentChange}%&nbsp; {arrowSymbol}
        </span>
      </span>
    );
  }

  return (
    <div className="percent-change-container">
      <div>
        <h3>Buy USD Percent Change: {formatPercentChange(buyPercentChange)}</h3>
      </div>
      <div>
        <h3>Sell USD Percent Change: {formatPercentChange(sellPercentChange)}</h3>
      </div>
    </div>
  );
}

export default PercentChange;
