import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Weather = () => {
  const [data, setData] = useState();

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

  return (
    <div className="text-right">
      <h1 className="text-5xl text-white">
        {temperature}
        <i className="wi wi-degrees"></i>
        <i className={`wi wi-owm-${id}`}></i>
      </h1>
    </div>
  );
};
