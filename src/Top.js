import React from 'react';
import { Browsing } from './Browsing';
import { Settings } from './Settings';

export const Top = (props) => {
  return (
    <div className="grid grid-cols-2 items-end p-5">
      <div className="grid grid-flow-col gap-10 justify-start">
        <Browsing />
      </div>
      <div className="text-right">
        <Settings />
      </div>
    </div>
  );
};
