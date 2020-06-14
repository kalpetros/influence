import React, { useEffect } from 'react';
import { Weather } from './Weather';
import { Time } from './Time';

export const Top = () => {
  return (
    <div className="grid grid-cols-2 p-5">
      <Time />
      <Weather />
    </div>
  );
};
