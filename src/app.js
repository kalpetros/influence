import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Layout } from './Layout';
import { Browsing } from './Browsing';
import { Settings } from './Settings';
import { Weather } from './Weather';
import { Top } from './Top';
import { Center } from './Center';
import { Bottom } from './Bottom';
import { getUnits } from './utils';
import { DB } from './utils';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faBookmark,
  faHistory,
  faList,
  faDownload,
  faBars,
  faCog,
  faTimes,
  faFolder,
  faCheck,
  faExclamationTriangle,
  faSearch,
  faChevronLeft,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  fab,
  faBookmark,
  faHistory,
  faList,
  faDownload,
  faBars,
  faCog,
  faTimes,
  faFolder,
  faCheck,
  faExclamationTriangle,
  faSearch,
  faChevronLeft,
  faInfoCircle
);

const App = () => {
  const [browsingIsVisible, setBrowsingIsVisible] = useState(false);
  const [settingsAreVisible, setSettingsAreVisible] = useState(false);
  const [weatherIsVisible, setWeatherIsVisible] = useState(false);

  useEffect(() => {
    getUnits();
  }, []);

  const handleBrowsingClick = () => {
    setBrowsingIsVisible((p) => (p ? false : true));
  };

  const handleSettingsClick = () => {
    setSettingsAreVisible((p) => (p ? false : true));
  };

  const handleWeatherClick = () => {
    setWeatherIsVisible((p) => (p ? false : true));
  };

  return (
    <>
      <Browsing isVisible={browsingIsVisible} onClose={handleBrowsingClick} />
      <Settings isVisible={settingsAreVisible} onClose={handleSettingsClick} />
      <Weather isVisible={weatherIsVisible} onClose={handleWeatherClick} />
      <Layout>
        <Top
          onBrowsingClick={handleBrowsingClick}
          onSettingsClick={handleSettingsClick}
        />
        <Center />
        <Bottom onWeatherClick={handleWeatherClick} />
      </Layout>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
