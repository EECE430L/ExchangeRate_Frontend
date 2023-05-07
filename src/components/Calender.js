import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//source: https://www.npmjs.com/package/react-datepicker
const Calender = ({ initialize, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(initialize);

  function handleDateChange(date) {
    setSelectedDate(date);
    // update the state variables of start and end date using a passed function from statistics page
    onDateChange(date);
  }

  return (
    <DatePicker
      className="date-picker"
      selected={selectedDate}
      onChange={(date) => handleDateChange(date)}
    />
  );
};

export default Calender;
