import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Modal } from './Modal';
import { getUnits } from './utils';

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

  let toggleClassName =
    'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded';

  let toggleClassNameSelected =
    'bg-blue-500 font-semibold text-white py-2 px-4 rounded';

  return (
    <Modal
      title="Settings"
      name="settings"
      isVisible={isVisible}
      onClose={onClose}
    >
      <div className="overflow-auto p-5">
        <div>
          <div className="grid grid-cols-2 items-center p-5 mb-2">
            <div className="text-lg text-gray-700">Time format</div>
            <div className="grid grid-flow-col gap-2 justify-end">
              <button
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
              </button>
              <button
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
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 items-center p-5 mb-2">
            <div className="text-lg text-gray-700">Temperature</div>
            <div className="grid grid-flow-col gap-2 justify-end">
              <button
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
              </button>
              <button
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
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 items-center p-5 mb-2">
            <div className="text-lg text-gray-700">Air pressure</div>
            <div className="grid grid-flow-col gap-2 justify-end">
              <button
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
              </button>
              <button
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
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 items-center p-5 mb-2">
            <div className="text-lg text-gray-700">Wind speed</div>
            <div className="grid grid-flow-col gap-2 justify-end">
              <button
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
              </button>
              <button
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

Settings.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
