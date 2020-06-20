import React, { createContext, useReducer } from 'react';
import { getSettings } from './utils';

import bg1 from './assets/1.jpg';
import bg2 from './assets/2.jpg';
import bg3 from './assets/3.jpg';
import bg4 from './assets/6.jpg';

const settings = getSettings();
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
  const [state, dispatch] = useReducer(settingsReducer, settings);

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};

const theme = {
  one: {
    background: bg1,
    todoItem: 'text-gray-700',
    inputText: 'text-white',
    buttonBorder: 'border-blue-500',
    buttonText: 'text-blue-500',
    settingsIcon: 'text-black',
    menuIcon: 'text-black',
    timeWidget: 'text-black',
    weatherWidget: 'text-black',
  },
  two: {
    background: bg2,
    todoItem: 'text-white',
    inputText: 'text-white',
    buttonBorder: 'border-white',
    buttonText: 'text-white',
    settingsIcon: 'text-white',
    menuIcon: 'text-white',
    timeWidget: 'text-white',
    weatherWidget: 'text-white',
  },
  three: {
    background: bg3,
    todoItem: 'text-white',
    inputText: 'text-white',
    buttonBorder: 'border-blue-500',
    buttonText: 'text-blue-500',
    settingsIcon: 'text-black',
    menuIcon: 'text-black',
    timeWidget: 'text-white',
    weatherWidget: 'text-white',
  },
  four: {
    background: bg4,
    todoItem: 'text-gray-700',
    inputText: 'text-gray-700',
    buttonBorder: 'border-blue-500',
    buttonText: 'text-blue-500',
    settingsIcon: 'text-black',
    menuIcon: 'text-black',
    timeWidget: 'text-black',
    weatherWidget: 'text-black',
  },
};

export const ThemeContext = createContext(theme);

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'update':
      return theme;
    default:
      throw new Error();
  }
};

export const ThemeStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, theme);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
