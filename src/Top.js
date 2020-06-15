import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Top = (props) => {
  const onMenuClick = props.onMenuClick;

  return (
    <div className="grid grid-cols-2 items-end p-5">
      <div className="grid grid-flow-col gap-10 justify-start">
        <FontAwesomeIcon
          icon="bars"
          size="2x"
          className="cursor-pointer"
          onClick={onMenuClick}
        />
      </div>
      <div className="text-right">
        <FontAwesomeIcon
          icon="cog"
          size="2x"
          className="cursor-pointer"
          onClick={onMenuClick}
        />
      </div>
    </div>
  );
};
