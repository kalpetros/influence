import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SettingsContext } from './store';

const Menu = (props) => {
  const {
    title: title,
    view: view,
    items: items,
    isDarkMode: isDarkMode,
    onClick: onClick,
    onClose: onClose,
  } = props;
  const theme = isDarkMode === 'true' ? 'bg-black' : 'bg-white border-b';
  const iconTheme =
    isDarkMode === 'true' ? 'text-blue-500 cursor-pointer' : 'cursor-pointer';
  const menuClassName = `grid grid-flow-col ${theme}`;

  if (typeof items !== 'undefined') {
    const tabs = items.map((item) => {
      const theme =
        isDarkMode === 'true'
          ? 'text-white'
          : 'text-blue-500 border-l border-r';
      let baseLiClassName = `mr-1 inline-block p-5 cursor-pointer`;

      if (view === item.id) {
        baseLiClassName = `${baseLiClassName} ${theme} font-semibold`;
      } else {
        baseLiClassName = `${baseLiClassName} text-blue-500`;
      }

      return (
        <li
          key={item.id}
          id={item.id}
          className={baseLiClassName}
          onClick={onClick}
        >
          {item.name}
        </li>
      );
    });

    return (
      <div className={menuClassName}>
        <ul>{tabs}</ul>
        <div className="p-5 text-right">
          <FontAwesomeIcon
            icon="times"
            size="lg"
            className={iconTheme}
            onClick={onClose}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`${menuClassName} p-5`}>
      <div className="text-left text-blue-500 font-semibold">{title}</div>
      <div className="text-right">
        <FontAwesomeIcon
          icon="times"
          size="lg"
          className={iconTheme}
          onClick={onClose}
        />
      </div>
    </div>
  );
};

Menu.propTypes = {
  title: PropTypes.string,
  view: PropTypes.string,
  items: PropTypes.array,
  isDarkMode: PropTypes.string,
  onClick: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};

Menu.defaultProps = {
  title: 'Menu',
  onClose: () => {
    console.log('Menu close clicked');
  },
};

export const Modal = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    icon: icon,
    iconSize: iconSize,
    iconColor: iconColor,
    title: title,
    name: name,
    view: view,
    menuItems: menuItems,
    onClick: onClick,
    children: children,
  } = props;
  const { state: settings } = useContext(SettingsContext);
  const isDarkMode = settings.darkMode;
  const theme = isDarkMode === 'true' ? 'bg-black' : 'bg-white';

  let className = `grid max-content-rows fixed rounded-lg shadow-lg z-50 overflow-hidden ${name} ${theme}`;
  let visibilityClassName = `${name}--hidden`;

  if (isVisible) {
    visibilityClassName = `${name}--visible`;
  }

  className = `${className} ${visibilityClassName}`;

  const handleToggle = () => {
    setIsVisible((s) => (s ? false : true));
  };

  return (
    <>
      <FontAwesomeIcon
        icon={icon}
        size={iconSize}
        className={`cursor-pointer text-${iconColor}`}
        onClick={handleToggle}
      />
      <div className={className}>
        <Menu
          isDarkMode={isDarkMode}
          title={title}
          view={view}
          items={menuItems}
          onClick={onClick}
          onClose={handleToggle}
        />
        {children}
      </div>
    </>
  );
};

Modal.propTypes = {
  icon: PropTypes.string.isRequired,
  iconSize: PropTypes.string,
  iconColor: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  view: PropTypes.string,
  menuItems: PropTypes.array,
  onClick: PropTypes.func,
  children: PropTypes.object.isRequired,
};

Modal.defaultProps = {
  icon: 'bars',
  iconSize: 'sm',
  iconColor: 'black',
  name: 'Modal',
};
