import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { formatTemperature } from './utils';
import { formatPressure } from './utils';
import { formatWind } from './utils';

const Menu = (props) => {
  const { onClose: onClose } = props;

  return (
    <div className="grid grid-flow-col bg-white border-b p-5">
      <div className="text-blue-500 font-semibold">Weather</div>
      <div className="text-right">
        <FontAwesomeIcon
          icon="times"
          size="lg"
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

Menu.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export const Weather = (props) => {
  const [data, setData] = useState();
  const { isVisible: isVisible, onClose: onClose } = props;
  let className = 'weather--hidden';

  if (isVisible) {
    className = 'weather--visible';
  }

  useEffect(() => {
    getUserPosition();
  }, []);

  const getUserPosition = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 600000,
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  const success = (position) => {
    const appId = 'e005960b25bcbd7522cef238087e6141';
    const { latitude: latitude, longitude: longitude } = position.coords;
    const units = 'metric';

    let endpoint = 'http://api.openweathermap.org/data/2.5/weather';
    endpoint = `${endpoint}?lat=${latitude}&lon=${longitude}&units=${units}&APPID=${appId}`;

    axios
      .get(endpoint)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const error = () => {};

  if (typeof data === 'undefined') {
    return null;
  }

  let {
    temp: temperature,
    feels_like: feelsLike,
    humidity: humidity,
    pressure: pressure,
    temp_max: temperatureMax,
    temp_min: temperatureMin,
  } = data.main;

  let { deg: windDegrees, speed: windSpeed } = data.wind;
  const id = data.weather[0].id;
  const description = data.weather[0].description;

  temperature = formatTemperature(temperature);
  feelsLike = formatTemperature(feelsLike);
  temperatureMax = formatTemperature(temperatureMax);
  temperatureMin = formatTemperature(temperatureMin);
  pressure = formatPressure(pressure);
  windSpeed = formatWind(windSpeed);

  return (
    <div
      className={`grid max-content-rows fixed rounded-lg bg-white shadow-lg overflow-hidden z-50 weather ${className}`}
    >
      <Menu onClose={onClose} />
      <div className="p-5">
        <div>
          <h1 className="text-md text-gray-700 uppercase">Current weather</h1>
        </div>
        <div>
          <h1 className="text-5xl">
            <i className={`wi wi-owm-${id}`}></i> {temperature}
          </h1>
        </div>
        <div>
          <p className="text-2xl">
            Temperature in {data.name} feels like {feelsLike} with {description}
          </p>
          <p className="text-2xl">
            Temperatures will span from {temperatureMin} to {temperatureMax}
          </p>
          <p className="text-2xl">
            Air pressure is at {pressure} and humidity at {humidity}{' '}
            <i className="wi wi-humidity"></i>
          </p>
          <p className="text-2xl">
            Wind is coming from{' '}
            <i className={`wi wi-wind towards-${windDegrees}-deg`}></i> at{' '}
            {windSpeed}
          </p>
        </div>
      </div>
    </div>
  );
};

Weather.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
