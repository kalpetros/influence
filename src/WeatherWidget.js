import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const WeatherWidget = (props) => {
  const [data, setData] = useState();
  const onClick = props.onClick;

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
    <div className="text-right">
      <h1 className="text-lg">
        <i className={`wi wi-owm-${id}`}></i>
      </h1>
      <h1 className="text-5xl">
        {temperature}
        <i className="wi wi-degrees"></i>
      </h1>
      <h1 className="text-xl">
        <FontAwesomeIcon
          icon="info-circle"
          size="sm"
          className="cursor-pointer"
          onClick={onClick}
        />{' '}
        {data.name}
      </h1>
    </div>
  );
};
