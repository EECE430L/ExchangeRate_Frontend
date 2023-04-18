import React from 'react';
import "../css/percentChange.css";

function PercentChange({ buyPercentChange, sellPercentChange }) {
    const formatPercentChange = (percentChange) => {
        const formattedPercentChange = percentChange.toFixed(2);

        const isPositive = formattedPercentChange >= 0;
        const percentChangeClassName = isPositive ? 'positive' : 'negative';
        const arrowSymbol = isPositive ? '\u2191' : '\u2193';
        const signSymbol = isPositive ? '+' : null;

        return (
            <span className={`percent-change ${percentChangeClassName}`}>
        <span>{signSymbol}</span>
                {formattedPercentChange}%&nbsp;
        <span>{arrowSymbol}</span>
      </span>
        );
    };

    return (
        <div className="percent-change-container">
            <div>
                <h3>
                    Buy Percent Change: {formatPercentChange(buyPercentChange)}
                </h3>
            </div>
            <div>
                <h3>
                    Sell Percent Change: {formatPercentChange(sellPercentChange)}
                </h3>
            </div>
        </div>
    );
}

export default PercentChange;
