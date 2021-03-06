import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';

import { Datepicker } from './Datepicker';
import { DB } from './utils';
import { getGreeting } from './utils';
import { ThemeContext } from './store';

export const TodoWidget = () => {
  const dateNow = moment().toISOString();
  const { state: theme } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState('');
  const [date, setDate] = useState(dateNow);
  const inputClassName = `appearance-none text-2xl bg-transparent h-20 w-full text-${theme.inputTextColor} leading-tight focus:outline-none`;

  useEffect(() => {
    fetchInit();
  }, []);

  const fetchInit = () => {
    DB.open()
      .then((response) => {
        fetchKeys();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchKeys = () => {
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

  const handleTodoDateChange = (date, todo) => {
    const key = parseInt(todo.key);

    let item = data.find((d) => {
      return parseInt(d.key) === key;
    });

    delete item['key'];
    item['date'] = date;

    DB.put(item, key)
      .then((response) => {
        fetchInit();
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
      return todo.status === 'todo';
    })
    .map((todo, index) => {
      let titleClass = `text-2xl text-${theme.todoItemColor}`;

      return (
        <li
          key={`todo-${index}`}
          className="grid grid-flow-col items-center py-5 pr-5 border-b border-gray-700 block cursor-pointer"
        >
          <div
            className={titleClass}
            data-key={todo.key}
            onClick={handleTodoClick}
          >
            {todo.title}
          </div>
          <div className="grid justify-end">
            <Datepicker
              isData
              date={todo.date}
              todo={todo}
              onChange={handleTodoDateChange}
            />
          </div>
        </li>
      );
    });

  return (
    <div className="grid max-content-rows-2 h-full w-8/12 m-auto overflow-hidden">
      <div>
        <h1 className={`text-5xl text-${theme.greetingTextColor}`}>
          {getGreeting()}
        </h1>
        <div className="grid grid-flow-col items-center border-b border-gray-500">
          <div>
            <input
              className={inputClassName}
              type="text"
              placeholder="What do you want to do?"
              value={todo}
              onChange={handleInputChange}
              onKeyDown={handleSubmit}
            />
          </div>
          <div className="grid justify-end pr-5">
            <Datepicker
              date={date}
              buttonColor={theme.buttonColor}
              onChange={handleDateChange}
            />
          </div>
        </div>
      </div>
      <div className="mt-10 overflow-auto">
        <ul>{items}</ul>
      </div>
    </div>
  );
};
