import React from "react";

import { useState } from "react";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";


import "react-datepicker/dist/react-datepicker.css";


const Range = () => {
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 17)
  );

  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      showTimeSelect
      minTime={setHours(setMinutes(new Date(), 0), 17)}
      maxTime={setHours(setMinutes(new Date(), 30), 20)}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};

export default Range;
