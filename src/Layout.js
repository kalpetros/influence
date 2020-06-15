import React, { useState } from 'react';
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
      className="grid grid-flow-row h-screen w-screen overflow-hidden"
      style={style}
    >
      {children}
    </div>
  );
};
