import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { toBeaufort } from './utils';

const Menu = (props) => {
  const { onClose: onClose } = props;

  return (
    <div className="grid grid-flow-col bg-white border-b">
      <div className="p-5">
        <p>Weather</p>
      </div>
      <div className="p-5 text-right">
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
    return <div className="text-right">Getting weather...</div>;
  }

  let {
    temp: temperature,
    feels_like: feelsLike,
    humidity: humidity,
    pressure: pressure,
    temp_max: temperatureMax,
    temp_min: temperatureMin,
  } = data.main;

  const { deg: windDegrees, speed: windSpeed } = data.wind;
  const id = data.weather[0].id;
  const beaufort = toBeaufort(windSpeed);
  let wind = `${windSpeed} m/s`;

  temperature = Math.round(temperature, 1);
  feelsLike = Math.round(feelsLike, 0);
  temperatureMax = Math.round(temperatureMax, 0);
  temperatureMin = Math.round(temperatureMin, 0);

  wind = <i className={`wi wi-wind-beaufort-${beaufort}`}></i>;

  return (
    <div
      className={`grid max-content-row fixed rounded-lg bg-white shadow-lg overflow-hidden z-50 weather ${className}`}
    >
      <Menu onClose={onClose} />
      <div className="p-5">
        <div>
          <h1 className="text-md text-gray-700 uppercase">Current weather</h1>
        </div>
        <div>
          <h1 className="text-5xl">
            <i className={`wi wi-owm-${id}`}></i> {temperature}{' '}
            <i className="wi wi-celsius"></i>
          </h1>
        </div>
        <div>
          <p className="text-2xl">
            Temperature in {data.name}{' '}
            <span className="text-green-400">
              feels like {feelsLike} <i className="wi wi-celsius"></i>
            </span>{' '}
            with a{' '}
            <span className="text-green-400">
              maximum at {temperatureMax} <i className="wi wi-celsius"></i>
            </span>{' '}
            and{' '}
            <span className="text-green-400">
              minimum at {temperatureMin} <i className="wi wi-celsius"></i>
            </span>
          </p>
          <p className="text-2xl">
            Air pressure is at {pressure} mbar and{' '}
            <span className="text-green-400">
              humidity at {humidity} <i className="wi wi-humidity"></i>
            </span>
          </p>
          <p className="text-2xl">
            Wind is coming from{' '}
            <i className={`wi wi-wind towards-${windDegrees}-deg`}></i> at{' '}
            {wind}
          </p>
        </div>
      </div>
    </div>
  );
};
