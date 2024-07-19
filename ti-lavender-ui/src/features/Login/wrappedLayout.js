import React from 'react';
import Login from '.';

const wrappedLayout = (WrappedComponent) => {
  return (props) => {
    return (
      <Login>
        <WrappedComponent {...props} />
      </Login>
    );
  };
};

export default wrappedLayout;