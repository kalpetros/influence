import React, { useContext } from 'react';

import { Modal } from './Modal';
import { SettingsContext } from './store';
import { ThemeContext } from './store';

export const Settings = () => {
  const { state: settings, dispatch } = useContext(SettingsContext);
  const { state: theme } = useContext(ThemeContext);
  const isDarkMode = settings.darkMode;

  let toggleClassName =
    'bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded';
  let toggleClassNameSelected =
    'bg-blue-500 font-semibold text-white py-2 px-4 rounded';
  let textClassName =
    isDarkMode === 'true'
      ? 'text-left text-lg text-blue-500'
      : 'text-left text-lg text-gray-500';

  const handleChangeSettings = (e) => {
    const setting = e.currentTarget.dataset.setting;
    const value = e.currentTarget.dataset.value;
    dispatch({ type: 'UPDATE', setting: setting, value: value });
  };

  return (
    <Modal
      icon="cog"
      iconSize="2x"
      iconColor={theme.settingsIconColor}
      title="Settings"
      name="settings"
    >
      <div className="overflow-auto p-5">
        <div>
          <div className="grid grid-cols-2 items-center p-5 mb-2">
            <div className={textClassName}>Time format</div>
            <div className="grid grid-flow-col gap-2 justify-end">
              <button
                className={
                  settings.time === '12'
                    ? toggleClassNameSelected
                    : toggleClassName
                }
                data-value="12"
                data-setting="time"
                onClick={handleChangeSettings}
              >
                12hr
              </button>
              <button
                className={
                  settings.time === '24'
                    ? toggleClassNameSelected
                    : toggleClassName
                }
                data-value="24"
                data-setting="time"
                onClick={handleChangeSettings}
              >
                24hr
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 items-center p-5 mb-2">
            <div className={textClassName}>Temperature</div>
            <div className="grid grid-flow-col gap-2 justify-end">
              <button
                className={
                  settings.temperature === 'celsius'
                    ? toggleClassNameSelected
                    : toggleClassName
                }
                data-value="celsius"
                data-setting="temperature"
                onClick={handleChangeSettings}
              >
                Celsius
              </button>
              <button
                className={
                  settings.temperature === 'fahrenheit'
                    ? toggleClassNameSelected
                    : toggleClassName
                }
                data-value="fahrenheit"
                data-setting="temperature"
                onClick={handleChangeSettings}
              >
                Fahrenheit
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 items-center p-5 mb-2">
            <div className={textClassName}>Air pressure</div>
            <div className="grid grid-flow-col gap-2 justify-end">
              <button
                className={
                  settings.pressure === 'pascal'
                    ? toggleClassNameSelected
                    : toggleClassName
                }
                data-value="pascal"
                data-setting="pressure"
                onClick={handleChangeSettings}
              >
                Pascal
              </button>
              <button
                className={
                  settings.pressure === 'mbar'
                    ? toggleClassNameSelected
                    : toggleClassName
                }
                data-value="mbar"
                data-setting="pressure"
                onClick={handleChangeSettings}
              >
                mbar
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 items-center p-5 mb-2">
            <div className={textClassName}>Wind speed</div>
            <div className="grid grid-flow-col gap-2 justify-end">
              <button
                className={
                  settings.wind === 'ms'
                    ? toggleClassNameSelected
                    : toggleClassName
                }
                data-value="ms"
                data-setting="wind"
                onClick={handleChangeSettings}
              >
                m/s
              </button>
              <button
                className={
                  settings.wind === 'beaufort'
                    ? toggleClassNameSelected
                    : toggleClassName
                }
                data-value="beaufort"
                data-setting="wind"
                onClick={handleChangeSettings}
              >
                Beaufort
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 items-center p-5 mb-2">
            <div className={textClassName}>Dark mode</div>
            <div className="grid grid-flow-col gap-2 justify-end">
              <button
                className={
                  settings.darkMode === 'true'
                    ? toggleClassNameSelected
                    : toggleClassName
                }
                data-value="true"
                data-setting="darkMode"
                onClick={handleChangeSettings}
              >
                Yes
              </button>
              <button
                className={
                  settings.darkMode === 'false'
                    ? toggleClassNameSelected
                    : toggleClassName
                }
                data-value="false"
                data-setting="darkMode"
                onClick={handleChangeSettings}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
