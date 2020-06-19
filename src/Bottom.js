import React from 'react';
import PropTypes from 'prop-types';

import { TimeWidget } from './TimeWidget';
import { WeatherWidget } from './WeatherWidget';
// import { Weather } from './Weather';

export const Bottom = (props) => {
  const onWeatherClick = props.onWeatherClick;

  return (
    <div className="grid grid-cols-2 items-end p-5">
      <TimeWidget />
      <WeatherWidget />
    </div>
  );
};
