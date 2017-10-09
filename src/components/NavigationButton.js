import {
  FlatButton,
  RaisedButton,
} from 'material-ui';
import React from 'react';
import { withRouter } from 'react-router-dom';

const buttons = {
  flat: FlatButton,
  raised: RaisedButton,
};

export default withRouter(({ history, onClick, type, ...props }) => {
  const buttonProps = {
    ...props,    
    onClick: (...args) => onClick(history, ...args),
  };
  const ButtonComponent = buttons[type] || FlatButton;

  return <ButtonComponent { ...buttonProps }/>;
});
