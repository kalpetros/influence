import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { ThemeContext } from './store';

export const Layout = ({ children }) => {
  const { state } = useContext(ThemeContext);

  const style = {
    backgroundImage: `url(${state.background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    transition: 'background 1s ease-in',
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
