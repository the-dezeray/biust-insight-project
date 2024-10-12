import React from 'react';

export default function Root({ children }) {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}