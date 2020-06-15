import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getUnits } from './utils';
import propTypes from 'prop-types';

const Menu = (props) => {
  const { onClose: onClose } = props;

  return (
    <div className="grid grid-flow-col bg-white border-b p-5">
      <div className="text-blue-500 font-semibold">Settings</div>
      <div className="text-right">
        <FontAwesomeIcon
          icon="times"
          size="lg"
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

Menu.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export const Settings = (props) => {
  const { isVisible: isVisible, onClose: onClose } = props;
  const [units, setUnits] = useState({});

  useEffect(() => {
    const units = getUnits();
    setUnits(units);
  }, []);

  const handleChangeUnits = (e) => {
    const units = getUnits();
    const setting = e.currentTarget.dataset.setting;
    const unit = e.currentTarget.dataset.unit;
    units[setting] = unit;
    localStorage.setItem('units', JSON.stringify(units));
    setUnits(units);
  };

  let className = 'settings--hidden';

  if (isVisible) {
    className = 'settings--visible';
  }

  let toggleClassName =
    'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer';

  let toggleClassNameSelected =
    'bg-blue-500 font-semibold text-white py-2 px-4 border rounded cursor-pointer';

  return (
    <div
      className={`grid max-content-row fixed rounded-lg bg-white shadow-lg overflow-hidden z-50 settings ${className}`}
    >
      <Menu onClose={onClose} />
      <div className="p-5">
        <div>
          <div className="grid grid-cols-2 items-center p-5 mb-2 rounded shadow">
            <div>Time format</div>
            <div className="grid grid-flow-col gap-2 justify-end">
              <div
                className={
                  units.time === '12'
                    ? toggleClassNameSelected
                    : toggleClassName
                }
                data-unit="12"
                data-setting="time"
                onClick={handleChangeUnits}
              >
                12hr
              </div>
              <div
                className={
                  units.time === '24'
                    ? toggleClassNameSelected
                    : toggleClassName
                }
                data-unit="24"
                data-setting="time"
                onClick={handleChangeUnits}
              >
                24hr
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 items-center p-5 mb-2 rounded shadow">
            <div>Temperature</div>
            <div className="grid grid-flow-col gap-2 justify-end">
              <div
                className={
                  units.temperature === 'celsius'
                    ? toggleClassNameSelected
                    : toggleClassName
                }
                data-unit="celsius"
                data-setting="temperature"
                onClick={handleChangeUnits}
              >
                Celsius
              </div>
              <div
                className={
                  units.temperature === 'fahrenheit'
                    ? toggleClassNameSelected
                    : toggleClassName
                }
                data-unit="fahrenheit"
                data-setting="temperature"
                onClick={handleChangeUnits}
              >
                Fahrenheit
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 items-center p-5 mb-2 rounded shadow">
            <div>Air pressure</div>
            <div className="grid grid-flow-col gap-2 justify-end">
              <div
                className={
                  units.pressure === 'pascal'
                    ? toggleClassNameSelected
                    : toggleClassName
                }
                data-unit="pascal"
                data-setting="pressure"
                onClick={handleChangeUnits}
              >
                Pascal
              </div>
              <div
                className={
                  units.pressure === 'mbar'
                    ? toggleClassNameSelected
                    : toggleClassName
                }
                data-unit="mbar"
                data-setting="pressure"
                onClick={handleChangeUnits}
              >
                mbar
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 items-center p-5 mb-2 rounded shadow">
            <div>Wind speed</div>
            <div className="grid grid-flow-col gap-2 justify-end">
              <div
                className={
                  units.wind === 'ms'
                    ? toggleClassNameSelected
                    : toggleClassName
                }
                data-unit="ms"
                data-setting="wind"
                onClick={handleChangeUnits}
              >
                m/s
              </div>
              <div
                className={
                  units.wind === 'beaufort'
                    ? toggleClassNameSelected
                    : toggleClassName
                }
                data-unit="beaufort"
                data-setting="wind"
                onClick={handleChangeUnits}
              >
                Beaufort
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Settings.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
