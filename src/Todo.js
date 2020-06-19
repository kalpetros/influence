import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';

import { DB } from './utils';
import { SettingsContext } from './store';

export const Todo = () => {
  const [data, setData] = useState([]);
  const context = useContext(SettingsContext);
  const { state: settings } = context;
  const isDarkMode = settings.darkMode;
  const theme =
    isDarkMode === 'true' ? 'text-blue-500' : 'text-gray-700 border-b';
  const className = `p-5 block cursor-pointer ${theme}`;

  useEffect(() => {
    fetchInit();
  }, []);

  const fetchInit = () => {
    DB.getKeys()
      .then((response) => {
        fetchData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchData = (keys) => {
    const promises = keys.map((key) => {
      return DB.get(key);
    });

    Promise.all(promises)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const items = data
    .sort((a, b) => {
      const aIsBeforeB = moment(a.date).isBefore(b.date);
      const bIsBeforeA = moment(b.date).isBefore(a.date);

      if (aIsBeforeB) {
        return -1;
      }

      if (bIsBeforeA) {
        return 1;
      }

      return 0;
    })
    .filter((todo) => {
      return todo.status === 'done';
    })
    .map((todo, index) => {
      return (
        <li key={`browsing-todo-${index}`} className={className}>
          {todo.title}
        </li>
      );
    });

  return (
    <div className="overflow-auto p-5">
      <ul>{items}</ul>
    </div>
  );
};
