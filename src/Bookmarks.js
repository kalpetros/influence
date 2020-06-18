import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SettingsContext } from './store';

export const Bookmarks = () => {
  const [tree, setTree] = useState([]);
  const [data, setData] = useState([]);
  const context = useContext(SettingsContext);
  const { state: settings } = context;
  const isDarkMode = settings.darkMode;
  const theme =
    isDarkMode === 'true' ? 'text-blue-500' : 'text-gray-700 border-b';
  const className = `p-5 block cursor-pointer ${theme}`;

  useEffect(() => {
    setData(tree);
  }, [tree]);

  useEffect(() => {
    chrome.bookmarks.getTree(function (response) {
      setTree(response);
    });
  }, []);

  const handleClick = (e) => {
    const id = e.currentTarget.id;

    chrome.bookmarks.getSubTree(id, function (response) {
      setData(response);
    });
  };

  const handleBackClick = (e) => {
    chrome.bookmarks.getSubTree(id, function (response) {
      setData(response);
    });
  };

  const items = data.map((node) => {
    return node.children.map((child, index) => {
      if (typeof child.url !== 'undefined') {
        return (
          <a
            key={`bookmark-${child.id}-${index}`}
            className={className}
            href={child.url}
            target="__blank"
          >
            <img
              className="inline mr-5"
              src={`https://plus.google.com/_/favicon?domain_url=${child.url}`}
            />
            {child.title}
          </a>
        );
      }

      return (
        <div
          key={`bookmark-${child.id}-${index}`}
          id={child.id}
          className={className}
          onClick={handleClick}
        >
          <FontAwesomeIcon
            icon="folder"
            size="lg"
            className="mr-5 cursor-pointer"
          />
          {child.title}
        </div>
      );
    });
  });

  return (
    <div className="overflow-auto">
      <div className="p-5">{items}</div>
    </div>
  );
};
