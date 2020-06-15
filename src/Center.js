import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Datepicker = () => {
  const dateNow = moment().toISOString();
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(dateNow);
  const dateDiff = moment(date).diff(moment(dateNow), 'days');
  let dateFormatted = moment(dateNow).to(moment(date));

  if (dateDiff === 0) {
    dateFormatted = 'Today';
  }

  useEffect(() => {
    setIsOpen(false);
  }, [date]);

  const handleClick = () => {
    setIsOpen((p) => (p ? false : true));
  };

  const handleSelect = (e) => {
    const date = e.currentTarget.dataset.date;
    setDate(date);
  };

  let panel = null;

  if (isOpen) {
    const final = moment(dateNow).add(6, 'months');
    const days = final.diff(moment(dateNow), 'days');
    let dates = [];

    for (let i = 0; i <= days; i++) {
      const date = moment(dateNow).add(i, 'days');
      const dateStr = date.format('DD MMMM YYYY');
      const dateIso = date.toISOString();

      dates.push(
        <div
          key={`date-${i}`}
          className="p-5 border-b text-md text-center whitespace-no-wrap cursor-pointer"
          data-date={dateIso}
          onClick={handleSelect}
        >
          {dateStr}
        </div>
      );
    }

    panel = (
      <div className="absolute top-0 right-0 h-64 bg-white shadow-lg rounded overflow-auto">
        {dates}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={handleClick}
      >
        {dateFormatted}
      </button>
      {panel}
    </div>
  );
};

export const Center = () => {
  const [todo, setTodo] = useState('');

  const handleChange = (e) => {
    setTodo(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      console.log('Enter hit');
    }
  };

  const x = Array(25)
    .fill(1)
    .map(() => {
      return (
        <li className="grid grid-flow-col items-center py-5 pr-5 border-b border-gray-700 block cursor-pointer text-gray-700">
          <div className="text-2xl text-gray-700">
            Test of the system is down
          </div>
          <div className="grid justify-end">
            <div className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Today
            </div>
          </div>
        </li>
      );
    });

  return (
    <div className="w-8/12 m-auto h-full overflow-hidden">
      <h1 className="text-3xl">Hi Petros,</h1>
      <div className="grid grid-flow-col items-center border-b border-gray-500">
        <div>
          <input
            className="appearance-none text-2xl bg-transparent h-20 w-full text-gray-700 leading-tight focus:outline-none"
            type="text"
            placeholder="What do you want to do?"
            value={todo}
            onChange={handleChange}
            onKeyDown={handleSubmit}
          />
        </div>
        <div className="grid justify-end pr-5">
          <Datepicker />
        </div>
      </div>
      <div className="h-full mt-10 overflow-auto">
        <ul>{x}</ul>
      </div>
    </div>
  );
};
