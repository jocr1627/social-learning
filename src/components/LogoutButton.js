import React, { Component } from 'react';

import NavigationButton from '../components/NavigationButton';
import { getClassName } from '../css/CssUtils';

const logoutButtonText = 'Logout';

const displayName = 'LogoutButton';

export default class LogoutButton extends Component {
  static displayName = displayName;

  render() {
    const buttonProps = {
      className: getClassName(displayName),
      label: logoutButtonText,
      onClick: (history) => {
        localStorage.removeItem('user_id');
        history.push('/');
      },
      type: 'raised',
    };
    
    return <NavigationButton { ...buttonProps }/>;
  }
}
