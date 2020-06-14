import React, { useState, useEffect } from 'react';
import moment from 'moment';

export const Time = () => {
  const [date, setDate] = useState(moment());
  const time = date.format('HH:mm');
  const dateS = date.format('dddd, MMMM Do YYYY');

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
      <h1 className="text-5xl text-white">{time}</h1>
      <h2 className="text-xl">{dateS}</h2>
    </div>
  );
};
