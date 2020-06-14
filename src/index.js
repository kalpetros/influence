import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Layout } from './Layout';
import { Content } from './Content';
import { Top } from './Top';
import { Center } from './Center';
import { Bottom } from './Bottom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab, faAccusoft } from '@fortawesome/free-brands-svg-icons';
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
  faExclamationTriangle
);

const App = () => {
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  const handleMenuClick = () => {
    setMenuIsVisible((p) => (p ? false : true));
  };

  return (
    <Layout>
      <Content menuIsVisible={menuIsVisible} onClose={handleMenuClick} />
      <Top />
      <Center />
      <Bottom onMenuClick={handleMenuClick} />
    </Layout>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
