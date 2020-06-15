import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { formatTime } from './utils';

export const TimeWidget = () => {
  const [date, setDate] = useState(moment());
  const time = formatTime(date);
  const dateStr = date.format('dddd, MMMM Do YYYY');

  useEffect(() => {
    const interval = setInterval(() => {
      const date = moment();
      setDate(date);
    }, 0);

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h1 className="text-5xl">{time}</h1>
      <h2 className="text-lg">{dateStr}</h2>
    </div>
  );
};
