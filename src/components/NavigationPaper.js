import { Paper } from 'material-ui';
import React from 'react';
import { withRouter } from 'react-router-dom';

export default withRouter(({ children, history, onKeyPress, ...props }) => {
  const paperProps = {
    ...props,
    onKeyPress: (...args) => onKeyPress(history, ...args),
  };

  return (
    <Paper { ...paperProps }>
      { children }
    </Paper>
  );
});
