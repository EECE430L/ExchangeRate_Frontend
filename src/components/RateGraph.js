import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import moment from "moment";

function RateGraph({ data, width, height }) {
  const formatDate = (date) => {
    return moment(date).format("MMM DD, YYYY");
  };

  return (
    //source: https://recharts.org/en-US/api/LineChart
    <LineChart width={width} height={height} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" tickFormatter={formatDate} />
      <YAxis />
      <Tooltip
        contentStyle={{ backgroundColor: "white" }}
        labelStyle={{ fontWeight: "bold" }}
        formatter={(value) => `${value.toFixed(2)}`}
        labelFormatter={(label) => formatDate(label)}
      />
      <Legend />
      <Line
        type="monotone"
        dataKey="buyRate"
        stroke="#eb3f3f"
        name="Buy USD Rate"
        dot={{ stroke: "red", strokeWidth: 2, fill: "red" }}
        activeDot={{ stroke: "red", strokeWidth: 4, fill: "white" }}
      />
      <Line
        type="monotone"
        dataKey="sellRate"
        stroke="blue"
        name="Sell USD Rate"
        dot={{ stroke: "blue", strokeWidth: 2, fill: "blue" }}
        activeDot={{ stroke: "blue", strokeWidth: 4, fill: "white" }}
      />
    </LineChart>
  );
}

export default RateGraph;
