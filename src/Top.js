import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Top = (props) => {
  const onBrowsingClick = props.onBrowsingClick;
  const onSettingsClick = props.onSettingsClick;

  return (
    <div className="grid grid-cols-2 items-end p-5">
      <div className="grid grid-flow-col gap-10 justify-start">
        <FontAwesomeIcon
          icon="bars"
          size="2x"
          className="cursor-pointer"
          onClick={onBrowsingClick}
        />
      </div>
      <div className="text-right">
        <FontAwesomeIcon
          icon="cog"
          size="2x"
          className="cursor-pointer"
          onClick={onSettingsClick}
        />
      </div>
    </div>
  );
};

Top.propTypes = {
  onBrowsingClick: PropTypes.func.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
};
