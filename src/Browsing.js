import React, { useState, useContext } from 'react';

import { Modal } from './Modal';
import { RecentBookmarks } from './RecentBookmarks';
import { Bookmarks } from './Bookmarks';
import { History } from './History';
import { TopVisited } from './TopVisited';
import { Downloads } from './Downloads';
import { Todo } from './Todo';
import { ThemeContext } from './store';

export const Browsing = () => {
  const [view, setView] = useState('topVisited');
  const { state: theme } = useContext(ThemeContext);

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
      iconColor={theme.menuIconColor}
      name="browsing"
      view={view}
      menuItems={menuItems}
      onClick={handleClick}
    >
      {page}
    </Modal>
  );
};
