import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Layout } from './Layout';
import { Browsing } from './Browsing';
import { Top } from './Top';
import { Center } from './Center';
import { Bottom } from './Bottom';

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
  faChevronLeft
);

const App = () => {
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  const handleMenuClick = () => {
    setMenuIsVisible((p) => (p ? false : true));
  };

  return (
    <Layout>
      <Browsing menuIsVisible={menuIsVisible} onClose={handleMenuClick} />
      <Top onMenuClick={handleMenuClick} />
      <Center />
      <Bottom />
    </Layout>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
