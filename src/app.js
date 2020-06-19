import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Layout } from './Layout';
import { Top } from './Top';
import { TodoWidget } from './TodoWidget';
import { Bottom } from './Bottom';
import { SettingsStateProvider } from './store';

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
  faSpinner,
  faPause,
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
  faInfoCircle,
  faSpinner,
  faPause
);

const App = () => {
  return (
    <SettingsStateProvider>
      <Layout>
        <Top />
        <TodoWidget />
        <Bottom />
      </Layout>
    </SettingsStateProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
