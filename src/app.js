import React, { useState, useEffect, Children } from 'react';
import ReactDOM from 'react-dom';
import { Layout } from './Layout';
import { Weather } from './Weather';
import { Time } from './Time';

const TopSites = () => {
  const [topSites, setTopSites] = useState([]);

  useEffect(() => {
    chrome.topSites.get(function (sites) {
      setTopSites(sites);
    });
  }, []);

  return topSites;
};

const App = () => {
  return (
    <Layout>
      <div className="grid grid-cols-2 items-center h-10">
        <div></div>
        <div className="px-5 text-right">
          <Weather />
        </div>
      </div>
      <div className="grid items-center justify-center">
        <Time />
      </div>
      <div className="grid grid-cols-2 items-center h-10">
        <div></div>
      </div>
    </Layout>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
