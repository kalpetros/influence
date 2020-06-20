import React, { useState, useEffect, useContext } from 'react';
import { SettingsContext } from './store';

export const TopVisited = () => {
  const [data, setData] = useState([]);
  const { state: settings } = useContext(SettingsContext);
  const isDarkMode = settings.darkMode;
  const theme =
    isDarkMode === 'true' ? 'text-blue-500' : 'text-gray-700 border-b';
  const className = `p-5 block cursor-pointer ${theme}`;

  useEffect(() => {
    chrome.topSites.get(function (response) {
      setData(response);
    });
  }, []);

  const items = data.map((item, index) => {
    return (
      <a
        key={`topVisited-${index}`}
        className={className}
        href={item.url}
        target="__blank"
      >
        <img
          className="inline mr-5"
          src={`https://plus.google.com/_/favicon?domain_url=${item.url}`}
        />
        {item.title}
      </a>
    );
  });

  return <div className="overflow-auto p-5">{items}</div>;
};
