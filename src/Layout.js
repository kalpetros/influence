import React, { useState } from 'react';
import PropTypes from 'prop-types';

import background from './assets/background.jpg';

export const Layout = ({ children }) => {
  const style = {
    background: `url(${background})`,
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
