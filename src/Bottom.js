import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Bottom = () => {
  const handleClick = () => {
    alert('asdasd');
  };

  return (
    <div className="grid grid-cols-2 items-end p-5">
      <div className="grid grid-flow-col gap-10 justify-start">
        {/* <FontAwesomeIcon
          icon="bookmark"
          size="lg"
          className="cursor-pointer"
          onClick={handleClick}
        />
        <FontAwesomeIcon
          icon="history"
          size="lg"
          className="cursor-pointer"
          onClick={handleClick}
        />
        <FontAwesomeIcon
          icon="list"
          size="lg"
          className="cursor-pointer"
          onClick={handleClick}
        />
        <FontAwesomeIcon
          icon="download"
          size="lg"
          className="cursor-pointer"
          onClick={handleClick}
        /> */}
        <FontAwesomeIcon
          icon="bars"
          size="lg"
          className="cursor-pointer"
          onClick={handleClick}
        />
      </div>
      <div className="text-right">
        <FontAwesomeIcon
          icon="cog"
          size="lg"
          className="cursor-pointer"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};
