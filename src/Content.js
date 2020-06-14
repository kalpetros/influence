import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RecentBookmarks } from './RecentBookmarks';
import { Bookmarks } from './Bookmarks';
import { History } from './History';
import { TopVisited } from './TopVisited';
import { Downloads } from './Downloads';
import { Top } from './Top';

const Menu = (props) => {
  const { view: view, onClick: onClick, onClose: onClose } = props;
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
    let baseClass = 'mr-1 bg-white inline-block py-2 px-4 cursor-pointer';
    let className = `${baseClass} text-blue-500`;

    if (view === item.id) {
      className = `${baseClass} -mb-px border-l border-t border-r rounded-t text-blue-700 font-semibold`;
    }

    return (
      <li key={item.id} id={item.id} className={className} onClick={onClick}>
        {item.name}
      </li>
    );
  });

  return (
    <div className="sticky top-0 bg-white">
      <div className="p-5 text-right">
        <FontAwesomeIcon
          icon="times"
          size="lg"
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>
      <div>
        <ul className="flex border-b">{tabs}</ul>
      </div>
    </div>
  );
};

export const Content = () => {
  const [view, setView] = useState('topVisited');

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

  return (
    <div className="fixed top-0 w-2/3 h-screen overflow-auto bg-white">
      <Menu view={view} onClick={handleClick} onClose={handleClose} />
      {page}
    </div>
  );
};
