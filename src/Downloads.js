import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
    paused: paused,
    filename: filename,
    url: url,
  } = props.item;
  const {
    onOpenClick: onOpenClick,
    onCancelClick: onCancelClick,
    onPauseClick: onPauseClick,
    onRetryClick: onRetryClick,
    onResumeClick: onResumeClick,
  } = props;

  bytesReceived = formatBytes(bytesReceived, 0);
  totalBytes = formatBytes(totalBytes, 0);
  estimatedEndTime = moment(estimatedEndTime);
  const timeNow = moment();
  const minutesLeft = estimatedEndTime.diff(timeNow, 'minutes');
  let textClass = ' text-gray-700';
  let statusIcon = null;
  let information = null;

  if (state === 'complete') {
    textClass = 'text-gray-500';
    statusIcon = <FontAwesomeIcon icon="check" className="text-blue-700" />;

    information = (
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        data-id={id}
        onClick={onOpenClick}
      >
        Open
      </button>
    );
  } else if (state === 'interrupted') {
    textClass = 'text-gray-500';
    statusIcon = (
      <FontAwesomeIcon icon="exclamation-triangle" className="text-red-700" />
    );

    information = null;
  } else if (state === 'in_progress') {
    statusIcon = (
      <FontAwesomeIcon icon="spinner" className="text-blue-500" spin />
    );
    let button = (
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        data-id={id}
        onClick={onPauseClick}
      >
        Pause
      </button>
    );

    if (paused) {
      statusIcon = <FontAwesomeIcon icon="pause" className="text-blue-500" />;

      button = (
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          data-id={id}
          onClick={onResumeClick}
        >
          Resume
        </button>
      );
    }

    information = (
      <>
        {button}
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          data-id={id}
          onClick={onCancelClick}
        >
          Cancel
        </button>
      </>
    );
  }

  return (
    <div className="grid max-content-columns-3 gap-2 p-5 items-center border-b">
      <div className="w-10">{statusIcon}</div>
      <div className={textClass}>
        <p className="mb-2 font-semibold">{filename}</p>
        <p className="mb-2">{url}</p>
        <p className="text-blue-500">
          {bytesReceived} of {totalBytes} / {minutesLeft} minutes left
        </p>
      </div>
      <div className="grid grid-flow-col gap-2 justify-end">{information}</div>
    </div>
  );
};

Information.propTypes = {
  bytesReceived: PropTypes.string,
  totalBytes: PropTypes.string,
  estimatedEndTime: PropTypes.string,
  id: PropTypes.string,
  state: PropTypes.string,
  filename: PropTypes.string,
  url: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
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

  const handleOpenClick = (e) => {
    const id = parseInt(e.currentTarget.dataset.id);
    chrome.downloads.show(id);
  };

  const handleCancelClick = (e) => {
    const id = parseInt(e.currentTarget.dataset.id);
    chrome.downloads.cancel(id);
  };

  const handlePauseClick = (e) => {
    const id = parseInt(e.currentTarget.dataset.id);
    chrome.downloads.pause(id);
  };

  const handleResumeClick = (e) => {
    const id = parseInt(e.currentTarget.dataset.id);
    chrome.downloads.resume(id);
  };

  const items = data.map((item, index) => {
    return (
      <Information
        key={`download-item-${index}`}
        item={item}
        onOpenClick={handleOpenClick}
        onCancelClick={handleCancelClick}
        onPauseClick={handlePauseClick}
        onResumeClick={handleResumeClick}
      />
    );
  });

  return <div className="overflow-auto p-5">{items}</div>;
};
