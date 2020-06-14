import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

import { formatBytes } from './utils';

const Information = (props) => {
  let {
    bytesReceived: bytesReceived,
    totalBytes: totalBytes,
    estimatedEndTime: estimatedEndTime,
    id: id,
    state: state,
    filename: filename,
    url: url,
  } = props.item;
  const onClick = props.onClick;

  bytesReceived = formatBytes(bytesReceived, 0);
  totalBytes = formatBytes(totalBytes, 0);
  estimatedEndTime = moment(estimatedEndTime);
  const timeNow = moment();
  const minutesLeft = estimatedEndTime.diff(timeNow, 'minutes');
  let textClass = ' text-gray-700';
  let statusIcon = 'test';

  let information = (
    <>
      <div>
        <p>{minutesLeft} minutes left</p>
      </div>
      <div>
        <p>
          {bytesReceived} of {totalBytes}
        </p>
      </div>
    </>
  );

  if (state === 'complete') {
    textClass = 'text-gray-500';
    statusIcon = <FontAwesomeIcon icon="check" className="text-blue-700" />;

    information = (
      <div>
        <button
          id={id}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={onClick}
        >
          Open
        </button>
      </div>
    );
  } else if (state === 'interrupted') {
    textClass = 'text-gray-500';
    statusIcon = (
      <FontAwesomeIcon icon="exclamation-triangle" className="text-red-700" />
    );

    information = (
      <div>
        <button
          id={id}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={onClick}
        >
          Retry
        </button>
      </div>
    );
  } else if (state === 'in_progress') {
    statusIcon = (
      <FontAwesomeIcon icon="exclamation-triangle" className="text-red-700" />
    );

    information = (
      <div>
        <button
          id={id}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-5"
          onClick={onClick}
        >
          Pause
        </button>
        <button
          id={id}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={onClick}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-flow-col p-5 border-b block">
      <div className="grid grid-flow-col items-center">
        <div>{statusIcon}</div>
        <div className={textClass}>
          <p className="mb-2 font-semibold">{filename}</p>
          <p>{url}</p>
        </div>
      </div>
      <div className="grid items-center justify-end">{information}</div>
    </div>
  );
};

export const Downloads = () => {
  const [complete, setComplete] = useState([]);
  const [interrupted, setInterrupted] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const mergedData = [...complete, ...interrupted, ...inProgress];
    setData(mergedData);
  }, [complete, interrupted, inProgress]);

  useEffect(() => {
    const intervalComplete = setInterval(() => {
      chrome.downloads.search(
        {
          state: 'complete',
        },
        function (response) {
          if (response.length > 0) {
            setComplete(response);
          }
        }
      );
    }, 0);

    const intervalInterrupted = setInterval(() => {
      chrome.downloads.search(
        {
          state: 'interrupted',
        },
        function (response) {
          if (response.length > 0) {
            setInterrupted(response);
          }
        }
      );
    }, 0);

    const intervalInProgress = setInterval(() => {
      chrome.downloads.search(
        {
          state: 'in_progress',
        },
        function (response) {
          if (response.length > 0) {
            setInProgress(response);
          }
        }
      );
    }, 0);

    return function cleanup() {
      clearInterval(intervalComplete);
      clearInterval(intervalInterrupted);
      clearInterval(intervalInProgress);
    };
  }, []);

  const handleClick = (e) => {
    const id = parseInt(e.currentTarget.id);
    chrome.downloads.show(id);
  };

  const items = data.map((item, index) => {
    return (
      <Information
        key={`download-item-${index}`}
        item={item}
        onClick={handleClick}
      />
    );
  });

  return <div className="p-5">{items}</div>;
};
