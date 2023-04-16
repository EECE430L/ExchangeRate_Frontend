import React from 'react';
import RateGraph from "../components/RateGraph";

function Statistics(props) {
    const buyData = [
        { date: "2022-01-01", rate: 1500 + Math.random() * 500 },
        { date: "2022-02-01", rate: 1600 + Math.random() * 500 },
        { date: "2022-03-01", rate: 1700 + Math.random() * 500 },
        { date: "2022-04-01", rate: 1800 + Math.random() * 500 },
        { date: "2022-05-01", rate: 1900 + Math.random() * 500 },
        { date: "2022-06-01", rate: 2000 + Math.random() * 500 },
        { date: "2022-07-01", rate: 2100 + Math.random() * 500 },
        { date: "2022-08-01", rate: 2200 + Math.random() * 500 },
        { date: "2022-09-01", rate: 2300 + Math.random() * 500 },
        { date: "2022-10-01", rate: 2400 + Math.random() * 500 },
        { date: "2022-11-01", rate: 2500 + Math.random() * 500 },
        { date: "2022-12-01", rate: 2600 + Math.random() * 500 },
    ];

    const sellData = [
        { date: "2022-01-01", rate: 1500 + Math.random() * 500 },
        { date: "2022-02-01", rate: 1600 + Math.random() * 500 },
        { date: "2022-03-01", rate: 1700 + Math.random() * 500 },
        { date: "2022-04-01", rate: 1800 + Math.random() * 500 },
        { date: "2022-05-01", rate: 1900 + Math.random() * 500 },
        { date: "2022-06-01", rate: 2000 + Math.random() * 500 },
        { date: "2022-07-01", rate: 2100 + Math.random() * 500 },
        { date: "2022-08-01", rate: 2200 + Math.random() * 500 },
        { date: "2022-09-01", rate: 2300 + Math.random() * 500 },
        { date: "2022-10-01", rate: 2400 + Math.random() * 500 },
        { date: "2022-11-01", rate: 2500 + Math.random() * 500 },
        { date: "2022-12-01", rate: 2600 + Math.random() * 500 },
    ];

    return (
        <div>
            <RateGraph legend="Buy USD Rate" buyData={buyData} sellData={sellData}/>
        </div>
    );
}

export default Statistics;