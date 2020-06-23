import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Layout } from './Layout';
import { Top } from './Top';
import { TodoWidget } from './TodoWidget';
import { Bottom } from './Bottom';
import { SettingsStateProvider } from './store';
import { ThemeStateProvider } from './store';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faBookmark,
  faHistory,
  faList,
  faDownload,
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
  faTh,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  fab,
  faBookmark,
  faHistory,
  faList,
  faDownload,
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
  faTh
);

const App = () => {
  return (
    <SettingsStateProvider>
      <ThemeStateProvider>
        <Layout>
          <Top />
          <TodoWidget />
          <Bottom />
        </Layout>
      </ThemeStateProvider>
    </SettingsStateProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
