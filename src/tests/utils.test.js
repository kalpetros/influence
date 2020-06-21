import React from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';

import { toBeaufort } from '../utils';
import { formatBytes } from '../utils';
import { getSettings } from '../utils';
import { getGreeting } from '../utils';
import { formatTime } from '../utils';
import { formatTemperature } from '../utils';
import { formatPressure } from '../utils';
import { formatWind } from '../utils';

test('Test m/s to beaufort convertion', () => {
  const msUnit = 10;
  const beaufort = toBeaufort(msUnit);

  expect(beaufort).toBe(5);
});

test('Test 1000 bytes to KB convertion', () => {
  const bytes = 10;
  const result = formatBytes(bytes);

  expect(result).toBe('10 Bytes');
});

test('Test 1000000 bytes to MB convertion', () => {
  const bytes = 1000000;
  const result = formatBytes(bytes);

  expect(result).toBe('1 MB');
});

test('Test getting settings from local storage', () => {
  const settings = getSettings();

  expect(settings).toBeDefined();
});

test('Test settings number of keys', () => {
  const settings = getSettings();
  const nofKeys = Object.keys(settings).length;

  expect(nofKeys).toBe(5);
});

test('Test Greeting output', () => {
  const greeting = getGreeting();
  expect(greeting).toBe('Good evening,');
});

test('Test time formatting', () => {
  const time = moment('2020-05-05 12:00');
  const result = formatTime(time);
  expect(result).toBe('12:00');
});

test('Test time formatting with invalid date', () => {
  const time = moment('2020-20-12 12:00');
  const result = formatTime(time);
  expect(result).toBe('Invalid date');
});

test('Test temperature formatting', () => {
  const temperature = 25;
  const element = renderer.create(formatTemperature(temperature));
  const tree = element.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Test mbar to pascal pressure convertion', () => {
  const pressure = 1000;
  const result = formatPressure(pressure);
  expect(result).toBe('100000 Pa');
});

test('Test ms wind speed formatting', () => {
  const windSpeed = 200;
  const result = formatWind(windSpeed);
  expect(result).toBe('200 m/s');
});
