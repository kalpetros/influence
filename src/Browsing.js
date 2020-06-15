import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RecentBookmarks } from './RecentBookmarks';
import { Bookmarks } from './Bookmarks';
import { History } from './History';
import { TopVisited } from './TopVisited';
import { Downloads } from './Downloads';
import { Top } from './Top';

const Menu = (props) => {
  const {
    view: view,
    onBackClick: onBackClick,
    onClick: onClick,
    onClose: onClose,
  } = props;

  const items = [
    {
      id: 'topVisited',
      name: 'Top Visited',
    },
    {
      id: 'recentBookmarks',
      name: 'Recent Bookmarks',
    },
    {
      id: 'bookmarks',
      name: 'Bookmarks',
    },
    {
      id: 'history',
      name: 'History',
    },
    {
      id: 'downloads',
      name: 'Downloads',
    },
  ];

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
      <ul className="flex">{tabs}</ul>
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

export const Browsing = (props) => {
  const [view, setView] = useState('topVisited');
  const { isVisible: isVisible, onClose: onClose } = props;
  let className = 'browsing--hidden';

  const handleClick = (e) => {
    setView(e.currentTarget.id);
  };

  const handleClose = () => {
    alert('adasd');
  };

  const page =
    view === 'topVisited' ? (
      <TopVisited />
    ) : view === 'recentBookmarks' ? (
      <RecentBookmarks />
    ) : view === 'bookmarks' ? (
      <Bookmarks />
    ) : view === 'history' ? (
      <History />
    ) : view === 'downloads' ? (
      <Downloads />
    ) : null;

  if (isVisible) {
    className = 'browsing--visible';
  }

  return (
    <div
      className={`grid max-content-row fixed rounded-lg bg-white shadow-lg overflow-hidden z-50 browsing ${className}`}
    >
      <Menu view={view} onClick={handleClick} onClose={onClose} />
      {page}
    </div>
  );
};
