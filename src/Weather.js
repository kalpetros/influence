import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  const { deg: degrees, speed: speed } = data.wind;
  const id = data.weather[0].id;

  temperature = Math.round(temperature, 1);
  feelsLike = Math.round(feelsLike, 0);
  console.log(data);

  return (
    <div
      className={`grid max-content-row fixed rounded-lg bg-white shadow-lg overflow-hidden z-50 weather ${className}`}
    >
      <Menu onClose={onClose} />
    </div>
  );
};
