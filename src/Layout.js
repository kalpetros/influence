import React, { useState } from 'react';
import PropTypes from 'prop-types';

import bg1 from './assets/1.jpg';
import bg2 from './assets/2.jpg';
import bg3 from './assets/3.jpg';
import bg4 from './assets/6.jpg';

export const Layout = ({ children }) => {
  const style = {
    background: `url(${bg4})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div
      className="grid max-content-rows-3 h-screen w-screen overflow-hidden"
      style={style}
    >
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.array.isRequired,
};
