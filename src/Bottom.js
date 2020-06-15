import React from 'react';
import { Weather } from './Weather';
import { Time } from './Time';

export const Bottom = () => {
  return (
    <div className="grid grid-cols-2 items-end p-5">
      <Time />
      <Weather />
    </div>
  );
};
