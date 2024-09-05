import React from 'react';
import BusinessLogin from '.';

const wrappedLayout = (WrappedComponent) => {
  return (props) => {
    return (
      <BusinessLogin>
        <WrappedComponent {...props} />
      </BusinessLogin>
    );
  };
};

export default wrappedLayout;