import React, { useState } from 'react';
import PropTypes from 'prop-types';

import background from './assets/background.jpg';

export const Layout = ({ children }) => {
  const [wallpaper, setWallpaper] = useState('');

  var unsplash = 'https://source.unsplash.com/category/nature/1920x1080';

  const style = {
    background: `url(${background})`,
    backgroundSize: 'cover',
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
