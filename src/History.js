import React, { useState, useEffect } from 'react';

export const History = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    chrome.history.search(
      {
        text: '',
        maxResults: 100,
      },
      function (response) {
        setData(response);
      }
    );
  }, []);

  const items = data.map((item, index) => {
    return (
      <a
        key={`history-${index}`}
        className="p-5 border-b block cursor-pointer text-gray-700"
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

  return <div className="p-5">{items}</div>;
};
