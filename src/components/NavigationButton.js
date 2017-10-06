import { RaisedButton } from 'material-ui';
import React from 'react';
import { withRouter } from 'react-router-dom';

export default withRouter(({ history, onClick, ...props }) => {
  const buttonProps = {
    ...props,    
    onClick: () => onClick(history),
  };

  return <RaisedButton { ...buttonProps }/>;
});
