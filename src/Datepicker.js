import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export const Datepicker = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { isData: isData, date: date, onChange: onChange } = props;

  const dateNow = moment().toISOString();
  const dateDiff = moment(date).diff(dateNow, 'days');
  let dateFormatted = moment(dateNow).to(moment(date));

  if (dateDiff === 0) {
    dateFormatted = 'Today';
  }

  const handleClick = () => {
    setIsOpen((p) => (p ? false : true));
  };

  const handleSelect = (e) => {
    const date = e.currentTarget.dataset.date;
    setIsOpen((p) => (p ? false : true));
    onChange(date);
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
      <div className="absolute top-0 right-0 h-64 bg-white shadow-lg rounded-lg z-50 overflow-auto">
        {dates}
      </div>
    );
  }

  let buttonClass =
    'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded';

  if (isData) {
    if (dateDiff < 0) {
      buttonClass = 'bg-red-500 font-semibold text-white py-2 px-4 rounded';
    } else {
      buttonClass = 'bg-blue-500 font-semibold text-white py-2 px-4 rounded';
    }
  }

  return (
    <div className="relative">
      <button className={buttonClass} onClick={handleClick}>
        {dateFormatted}
      </button>
      {panel}
    </div>
  );
};

Datepicker.propTypes = {
  isData: PropTypes.bool,
  date: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
