import React from 'react';
import { TimeWidget } from './TimeWidget';
import { WeatherWidget } from './WeatherWidget';

export const Bottom = (props) => {
  const onWeatherClick = props.onWeatherClick;

  return (
    <div className="grid grid-cols-2 items-end p-5">
      <TimeWidget />
      <WeatherWidget onClick={onWeatherClick} />
    </div>
  );
};
