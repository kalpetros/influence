import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal } from './Modal';
import { RecentBookmarks } from './RecentBookmarks';
import { Bookmarks } from './Bookmarks';
import { History } from './History';
import { TopVisited } from './TopVisited';
import { Downloads } from './Downloads';
import { Todo } from './Todo';

export const Browsing = (props) => {
  const [view, setView] = useState('topVisited');

  const handleClick = (e) => {
    setView(e.currentTarget.id);
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
    ) : view === 'todo' ? (
      <Todo />
    ) : null;

  const menuItems = [
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
    {
      id: 'todo',
      name: 'Todo',
    },
  ];

  return (
    <Modal
      icon="bars"
      iconSize="2x"
      name="browsing"
      view={view}
      menuItems={menuItems}
      onClick={handleClick}
    >
      {page}
    </Modal>
  );
};
