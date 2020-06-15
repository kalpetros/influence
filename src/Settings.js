import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Menu = (props) => {
  const { onClose: onClose } = props;

  return (
    <div className="grid grid-flow-col bg-white border-b">
      <div className="p-5">
        <p>Settings</p>
      </div>
      <div className="p-5 text-right">
        <FontAwesomeIcon
          icon="times"
          size="lg"
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export const Settings = (props) => {
  const { isVisible: isVisible, onClose: onClose } = props;
  let className = 'settings--hidden';

  if (isVisible) {
    className = 'settings--visible';
  }

  return (
    <div
      className={`grid max-content-row fixed rounded-lg bg-white shadow-lg overflow-hidden z-50 settings ${className}`}
    >
      <Menu onClose={onClose} />
    </div>
  );
};
