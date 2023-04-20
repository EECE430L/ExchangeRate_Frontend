import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//source: https://www.npmjs.com/package/react-datepicker
const Calender = ({ onDateChange }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    function handleDateChange (date) {
        setSelectedDate(date);
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