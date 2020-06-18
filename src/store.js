import React, { createContext, useReducer } from 'react';
import { getSettings } from './utils';

export let settings = getSettings();

export const SettingsContext = createContext(settings);

export const SettingsStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'UPDATE_SETTINGS':
        settings[action.setting] = action.value;
        localStorage.setItem('settings', JSON.stringify(settings));
        return settings;
      default:
        throw new Error();
    }
  }, settings);

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};
