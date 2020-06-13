import React, { useState } from 'react';

export const Layout = ({ children }) => {
  const [wallpaper, setWallpaper] = useState('');

  var unsplash = 'https://source.unsplash.com/category/nature/1920x1080';

  const style = {
    background: `url(${unsplash})`,
    backgroundSize: 'cover',
  };

  return (
    <div className="h-screen grid grid-flow-row" style={style}>
      {children}
    </div>
  );
};
