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
    onClick: () => onClick(history),
  };
  const ButtonComponent = buttons[type] || FlatButton;

  return <ButtonComponent { ...buttonProps }/>;
});
