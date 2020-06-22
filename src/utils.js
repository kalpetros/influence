import React from 'react';
import moment from 'moment';

// Convert wind speed from m/s to beaufort scale
export function toBeaufort(wind) {
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

export function getSettings() {
  const settings = localStorage.getItem('settings');

  if (settings === null) {
    const settings = {
      time: '24',
      temperature: 'celsius',
      pressure: 'pascal',
      wind: 'ms',
      darkMode: 'false',
    };

    localStorage.setItem('settings', JSON.stringify(settings));

    return settings;
  }

  return JSON.parse(settings);
}

export function getGreeting() {
  const date = moment();
  const hours = date.hours();

  if (hours >= 17 || hours < 5) {
    return 'Good evening,';
  }

  if (hours >= 12 || hours < 17) {
    return 'Good afternoon,';
  }

  return 'Good morning,';
}

export function formatTime(obj) {
  const settings = getSettings();
  let time = obj.format('HH:mm');

  if (settings.time === '12') {
    time = obj.format('h:mm');
  }

  return time;
}

export const formatTemperature = (temperature) => {
  const settings = getSettings();
  temperature = Math.round(parseFloat(temperature), 1);

  if (settings.temperature === 'fahrenheit') {
    temperature = Math.round(temperature * 1.8 + 32, 0);
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

export function formatPressure(pressure) {
  const settings = getSettings();
  pressure = Math.round(parseFloat(pressure), 0);

  if (settings.pressure === 'pascal') {
    // 1 hPa (hectopascal) = 1 millibar = 100 Pa
    pressure = pressure * 100;
    return `${pressure} Pa`;
  }

  return `${pressure} mbar`;
}

export const formatWind = (wind) => {
  const settings = getSettings();

  if (settings.wind === 'beaufort') {
    wind = toBeaufort(parseFloat(wind));
    return <i className={`wi wi-wind-beaufort-${wind}`}></i>;
  }

  return `${wind} m/s`;
};

export const DB = {
  name: 'InfluenceDB',
  storeName: 'todo',
  version: 1,
  open: () => {
    return new Promise((resolve, reject) => {
      let db;

      const request = window.indexedDB.open(DB.name, DB.version);

      request.onsuccess = (e) => {
        db = e.target.result;

        resolve('success');

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

        resolve('success');
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
  put: (item, key) => {
    return new Promise((resolve, reject) => {
      let db;

      if (isNaN(key)) {
        reject('Key should be an integer');
        return;
      }

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
        const request = store.put(item, key);

        request.onsuccess = (e) => {
          resolve('success');
        };
      };

      request.onerror = (e) => {
        reject(e.target.errorCode);
      };
    });
  },
  getKeys: () => {
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

        const transaction = db.transaction(DB.storeName, 'readonly');
        const store = transaction.objectStore(DB.storeName);
        const request = store.getAllKeys();

        request.onsuccess = (e) => {
          const keys = e.target.result;
          resolve(keys);
        };
      };

      request.onerror = (e) => {
        reject(e.target.errorCode);
      };
    });
  },
  get: (key) => {
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

        const transaction = db.transaction(DB.storeName, 'readonly');
        const store = transaction.objectStore(DB.storeName);
        const request = store.get(key);

        request.onsuccess = (e) => {
          const result = e.target.result;
          result['key'] = key;
          resolve(result);
        };
      };

      request.onerror = (e) => {
        reject(e.target.errorCode);
      };
    });
  },
};
