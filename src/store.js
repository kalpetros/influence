import React, { createContext, useReducer } from 'react';
import { getSettings } from './utils';

export const SettingsContext = createContext(settings);

const settingsReducer = (state, action) => {
  switch (action.type) {
    case 'update':
      settings[action.setting] = action.value;
      localStorage.setItem('settings', JSON.stringify(settings));
      return settings;
    default:
      throw new Error();
  }
};

export const SettingsStateProvider = ({ children }) => {
  const settings = getSettings();
  const [state, dispatch] = useReducer(settingsReducer, settings);

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};
