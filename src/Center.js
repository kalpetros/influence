import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { Datepicker } from './Datepicker';
import { DB } from './utils';

export const Center = () => {
  const dateNow = moment().toISOString();
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState();
  const [date, setDate] = useState(dateNow);

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

  const handleInputChange = (e) => {
    setTodo(e.currentTarget.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleTodoClick = (e) => {
    const key = parseInt(e.currentTarget.dataset.key);

    let item = data.find((d) => {
      return parseInt(d.key) === key;
    });

    delete item['key'];
    item['status'] = item['status'] === 'todo' ? 'done' : 'todo';

    DB.put(item, key)
      .then((response) => {
        fetchInit();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      const item = {
        title: todo,
        date: date,
        status: 'todo',
      };

      DB.add(item)
        .then((response) => {
          setTodo('');
          fetchInit();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const todos = data
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
      return todo.status === 'todo';
    })
    .map((todo, index) => {
      let titleClass = 'text-2xl text-gray-700';

      if (todo.status === 'done') {
        titleClass = 'text-2xl text-gray-700 line-through';
      }

      return (
        <li
          key={`todo-${index}`}
          data-key={todo.key}
          className="grid grid-flow-col items-center py-5 pr-5 border-b border-gray-700 block cursor-pointer text-gray-700"
          onClick={handleTodoClick}
        >
          <div className={titleClass}>{todo.title}</div>
          <div className="grid justify-end">
            <Datepicker isData date={todo.date} onChange={handleDateChange} />
          </div>
        </li>
      );
    });

  return (
    <div className="grid max-content-rows-2 h-full w-8/12 m-auto overflow-hidden">
      <div>
        <h1 className="text-3xl">Good morning,</h1>
        <div className="grid grid-flow-col items-center border-b border-gray-500">
          <div>
            <input
              className="appearance-none text-2xl bg-transparent h-20 w-full text-gray-700 leading-tight focus:outline-none"
              type="text"
              placeholder="What do you want to do?"
              value={todo}
              onChange={handleInputChange}
              onKeyDown={handleSubmit}
            />
          </div>
          <div className="grid justify-end pr-5">
            <Datepicker date={date} onChange={handleDateChange} />
          </div>
        </div>
      </div>
      <div className="mt-10 overflow-auto">
        <ul>{todos}</ul>
      </div>
    </div>
  );
};
