import React from 'react';
import "../css/percentChange.css";

function PercentChange(props) {
    const { todayBuyRate, yesterdayBuyRate, todaySellRate, yesterdaySellRate } = props;
    const buyPercentChange = ((todayBuyRate - yesterdayBuyRate) / yesterdayBuyRate) * 100;
    const sellPercentChange = ((todaySellRate - yesterdaySellRate) / yesterdaySellRate) * 100;

    const formatPercentChange = (percentChange) => {
        const formattedPercentChange = percentChange.toFixed(2);

        const isPositive = formattedPercentChange >= 0;
        const percentChangeClassName = isPositive ? 'positive' : 'negative';
        const arrowSymbol = isPositive ? '\u2191' : '\u2193';
        const signSymbol = isPositive ? '+' : null;

        return (
            <span className={`percent-change ${percentChangeClassName}`}>
        <span>{signSymbol}</span>
                {formattedPercentChange}%
        <span>{arrowSymbol}</span>
      </span>
        );
    };

    return (
        <div className="percent-change-container">
            <div>
                <span>Buy Percent Change:</span>
                {formatPercentChange(buyPercentChange)}
            </div>
            <div>
                <span>Sell Percent Change:</span>
                {formatPercentChange(sellPercentChange)}
            </div>
        </div>
    );
}

export default PercentChange;
