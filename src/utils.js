import React, { useCallback } from 'react';
import moment from 'moment';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

// Convert wind speed from m/s to beaufort scale
function toBeaufort(wind) {
  let beaufort = 0;
  if (wind < 0.3) {
    beaufort = 0;
  } else if (wind >= 0.3 && wind <= 1.5) {
    beaufort = 1;
  } else if (wind >= 1.6 && wind <= 3.3) {
    beaufort = 2;
  } else if (wind >= 3.4 && wind <= 5.4) {
    beaufort = 3;
  } else if (wind >= 5.5 && wind <= 7.9) {
    beaufort = 4;
  } else if (wind >= 8 && wind <= 10.7) {
    beaufort = 5;
  } else if (wind >= 10.8 && wind <= 13.8) {
    beaufort = 6;
  } else if (wind >= 13.9 && wind <= 17.1) {
    beaufort = 7;
  } else if (wind >= 17.2 && wind <= 20.7) {
    beaufort = 8;
  } else if (wind >= 20.8 && wind <= 24.4) {
    beaufort = 9;
  } else if (wind >= 24.5 && wind <= 28.4) {
    beaufort = 10;
  } else if (wind >= 28.5 && wind <= 32.6) {
    beaufort = 11;
  } else if (wind >= 32.7) {
    beaufort = 12;
  }
  return beaufort;
}

export function formatBytes(bytes, decimals) {
  if (bytes == 0) return '0 Byte';
  const k = 1000; // or 1024 for binary
  const dm = decimals + 1 || 3;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function getUnits() {
  const units = localStorage.getItem('units');

  if (units === null) {
    const units = {
      time: '24',
      temperature: 'celsius',
      pressure: 'pascal',
      wind: 'ms',
    };

    localStorage.setItem('units', JSON.stringify(units));

    return units;
  }

  return JSON.parse(units);
}

export function formatTime(obj) {
  const units = getUnits();
  let time = obj.format('HH:mm');

  if (units.time === '12') {
    time = obj.format('h:mm');
  }

  return time;
}

export const formatTemperature = (temperature) => {
  const units = getUnits();
  temperature = Math.round(parseFloat(temperature), 0);

  if (units.temperature === 'fahrenheit') {
    temperature = temperature * 1.8 + 32;
    return (
      <>
        {temperature} <i className="wi wi-fahrenheit"></i>
      </>
    );
  }

  return (
    <>
      {temperature} <i className="wi wi-celsius"></i>
    </>
  );
};

/*
 ** 1 hPa (hectopascal) = 1 millibar = 100 Pa
 */
export function formatPressure(pressure) {
  const units = getUnits();
  pressure = Math.round(parseFloat(pressure), 0);

  if (units.pressure === 'pascal') {
    pressure = pressure * 100;
    return `${pressure} Pa`;
  }

  return `${pressure} mbar`;
}

export const formatWind = (wind) => {
  const units = getUnits();

  if (units.wind === 'beaufort') {
    wind = toBeaufort(parseFloat);
    return <i className={`wi wi-wind-beaufort-${wind}`}></i>;
  }

  return `${wind} m/s`;
};

export const DB = {
  name: 'InfluenceDB',
  storeName: 'todos',
  version: 1,
  open: () => {
    return new Promise((resolve, reject) => {
      let db;

      const request = window.indexedDB.open(DB.name, DB.version);

      request.onsuccess = (e) => {
        db = e.target.result;

        db.onsuccess = (e) => {
          resolve('success');
        };

        db.onerror = (e) => {
          reject(e.target.errorCode);
        };
      };

      request.onerror = (e) => {
        reject(e.target.errorCode);
      };

      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        const store = db.createObjectStore(DB.storeName, {
          autoIncrement: true,
        });

        store.createIndex('date', 'date', { unique: false });
      };
    });
  },
  add: (item) => {
    return new Promise((resolve, reject) => {
      let db;

      const request = window.indexedDB.open(DB.name, DB.version);

      request.onsuccess = (e) => {
        db = e.target.result;

        db.onsuccess = (e) => {
          resolve('success');
        };

        db.onerror = (e) => {
          reject(e.target.errorCode);
        };

        const transaction = db.transaction(DB.storeName, 'readwrite');
        const store = transaction.objectStore(DB.storeName);
        store.add(item);
        resolve('success');
      };

      request.onerror = (e) => {
        reject(e.target.errorCode);
      };
    });
  },
  get: () => {
    return new Promise((resolve, reject) => {
      let db;
      let objects = [];

      const request = window.indexedDB.open(DB.name, DB.version);

      request.onsuccess = (e) => {
        db = e.target.result;

        db.onsuccess = (e) => {
          resolve('success');
        };

        db.onerror = (e) => {
          reject(e.target.errorCode);
        };

        const transaction = db.transaction(DB.storeName, 'readonly');
        const store = transaction.objectStore(DB.storeName);
        const request = store.getAll();

        request.onsuccess = (e) => {
          resolve(e.target.result);
        };
      };

      request.onerror = (e) => {
        reject(e.target.errorCode);
      };
    });
  },
};
