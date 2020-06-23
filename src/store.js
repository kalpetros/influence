import React, { createContext, useReducer, useEffect } from 'react';
import moment from 'moment';
import { getSettings } from './utils';

import bg0 from './assets/0.jpg';
import bg1 from './assets/1.jpg';
import bg2 from './assets/2.jpg';
import bg3 from './assets/3.jpg';
import bg4 from './assets/4.jpg';
import bg5 from './assets/5.jpg';
import bg6 from './assets/6.jpg';
import bg7 from './assets/7.jpg';

const settings = getSettings();
export const SettingsContext = createContext(settings);

const settingsReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      const newState = Object.assign({}, state);
      newState[action.setting] = action.value;
      localStorage.setItem('settings', JSON.stringify(newState));
      return newState;
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

const themes = [
  {
    background: bg1,
    todoItemColor: 'gray-700',
    greetingTextColor: 'black',
    inputTextColor: 'black',
    buttonColor: 'blue-500',
    settingsIconColor: 'black',
    menuIconColor: 'black',
    weatherIconColor: 'black',
    timeWidgetColor: 'black',
    weatherWidgetColor: 'black',
  },
  {
    background: bg2,
    todoItemColor: 'white',
    greetingTextColor: 'white',
    inputTextColor: 'white',
    buttonColor: 'white',
    settingsIconColor: 'white',
    menuIconColor: 'white',
    weatherIconColor: 'white',
    timeWidgetColor: 'white',
    weatherWidgetColor: 'white',
  },
  {
    background: bg3,
    todoItemColor: 'white',
    greetingTextColor: 'white',
    inputTextColor: 'white',
    buttonColor: 'blue-500',
    settingsIconColor: 'white',
    menuIconColor: 'white',
    weatherIconColor: 'white',
    timeWidgetColor: 'white',
    weatherWidgetColor: 'white',
  },
  {
    background: bg4,
    todoItemColor: 'gray-700',
    greetingTextColor: 'white',
    inputTextColor: 'gray-700',
    buttonColor: 'blue-500',
    settingsIconColor: 'black',
    menuIconColor: 'black',
    weatherIconColor: 'black',
    timeWidgetColor: 'black',
    weatherWidgetColor: 'black',
  },
  {
    background: bg5,
    todoItemColor: 'gray-400',
    greetingTextColor: 'gray-400',
    inputTextColor: 'white',
    buttonColor: 'black',
    settingsIconColor: 'black',
    menuIconColor: 'black',
    weatherIconColor: 'black',
    timeWidgetColor: 'black',
    weatherWidgetColor: 'black',
  },
  {
    background: bg6,
    todoItemColor: 'white',
    greetingTextColor: 'white',
    inputTextColor: 'white',
    buttonColor: 'blue-500',
    settingsIconColor: 'white',
    menuIconColor: 'white',
    weatherIconColor: 'white',
    timeWidgetColor: 'white',
    weatherWidgetColor: 'white',
  },
  {
    background: bg7,
    todoItemColor: 'white',
    greetingTextColor: 'white',
    inputTextColor: 'white',
    buttonColor: 'blue-500',
    settingsIconColor: 'white',
    menuIconColor: 'white',
    weatherIconColor: 'white',
    timeWidgetColor: 'white',
    weatherWidgetColor: 'white',
  },
];

const defaultTheme = {
  background: bg0,
  todoItemColor: 'gray-700',
  greetingTextColor: 'white',
  inputTextColor: 'gray-700',
  buttonColor: 'blue-500',
  settingsIconColor: 'white',
  menuIconColor: 'white',
  weatherIconColor: 'white',
  timeWidgetColor: 'white',
  weatherWidgetColor: 'black',
};

export const ThemeContext = createContext(defaultTheme);

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      const date = moment();
      let day = date.day();

      return themes[day - 1];
    default:
      throw new Error();
  }
};

export const ThemeStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, defaultTheme);

  useEffect(() => {
    dispatch({ type: 'UPDATE' });
  }, []);

  return (
    <ThemeContext.Provider value={{ state }}>{children}</ThemeContext.Provider>
  );
};
