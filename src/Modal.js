import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Menu = (props) => {
  const {
    title: title,
    view: view,
    items: items,
    onClick: onClick,
    onClose: onClose,
  } = props;

  if (typeof items !== 'undefined') {
    const tabs = items.map((item) => {
      let baseClass = 'mr-1 bg-white inline-block p-5 cursor-pointer';
      let className = `${baseClass} text-blue-500`;

      if (view === item.id) {
        className = `${baseClass} border-l border-r text-blue-700 font-semibold`;
      }

      return (
        <li key={item.id} id={item.id} className={className} onClick={onClick}>
          {item.name}
        </li>
      );
    });

    return (
      <div className="grid grid-flow-col bg-white border-b">
        <ul>{tabs}</ul>
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
  }

  return (
    <div className="grid grid-flow-col bg-white border-b p-5">
      <div className="text-blue-500 font-semibold">{title}</div>
      <div className="text-right">
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

Menu.propTypes = {
  title: PropTypes.string,
  view: PropTypes.string,
  items: PropTypes.array,
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
  const {
    title: title,
    name: name,
    view: view,
    menuItems: menuItems,
    isVisible: isVisible,
    onClick: onClick,
    onClose: onClose,
    children: children,
  } = props;
  let className = `${name}--hidden`;

  if (isVisible) {
    className = `${name}--visible`;
  }

  return (
    <div
      className={`grid max-content-rows fixed rounded-lg bg-white shadow-lg z-50 overflow-hidden ${name} ${className}`}
    >
      <Menu
        title={title}
        view={view}
        items={menuItems}
        onClick={onClick}
        onClose={onClose}
      />
      {children}
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  view: PropTypes.string,
  menuItems: PropTypes.array,
  isVisible: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};
