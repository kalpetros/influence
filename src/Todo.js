import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';

import { DB } from './utils';
import { SettingsContext } from './store';

export const Todo = () => {
  const [data, setData] = useState([]);
  const { state: settings } = useContext(SettingsContext);
  const isDarkMode = settings.darkMode;
  const theme =
    isDarkMode === 'true' ? 'text-blue-500' : 'text-gray-700 border-b';
  const className = `grid grid-flow-col gap-2 p-5 items-center ${theme}`;

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
      const date = moment(todo.date).format('DD/MM/yyyy');

      return (
        <div key={`browsing-todo-${index}`} className={className}>
          <div>{todo.title}</div>
          <div className="text-right">{date}</div>
        </div>
      );
    });

  return (
    <div className="overflow-auto p-5">
      <ul>{items}</ul>
    </div>
  );
};
