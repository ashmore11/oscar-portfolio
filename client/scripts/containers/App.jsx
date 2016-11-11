import React, { PropTypes } from 'react';

export default function App({ children }) {
  return (
    <div className="AppContainer">
      <div className="Main">{children}</div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element,
};
