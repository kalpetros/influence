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
    <div className="h-screen w-screen grid grid-flow-row" style={style}>
      {children}
    </div>
  );
};
