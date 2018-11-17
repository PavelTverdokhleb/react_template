import React from 'react';

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
      PAGE 404
  </div>
);

export default NoMatch;