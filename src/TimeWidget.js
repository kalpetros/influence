import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';

import { formatTime } from './utils';
import { ThemeContext } from './store';

export const TimeWidget = () => {
  const [date, setDate] = useState(moment());
  const { state: theme } = useContext(ThemeContext);
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
      <h1 className={`text-5xl text-${theme.timeWidgetColor}`}>{time}</h1>
      <h2 className={`text-lg text-${theme.timeWidgetColor}`}>{dateStr}</h2>
    </div>
  );
};
