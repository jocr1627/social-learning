import React, { Component } from 'react';

import NavigationButton from '../components/NavigationButton';

const logoutButtonText = 'Logout';

const displayName = 'PostsPage';

export default class PostsPage extends Component {
  static displayName = displayName;

  render() {
    const buttonProps = {
      label: logoutButtonText,
      onClick: (history) => {
        localStorage.removeItem('user_id');
        history.push('/');
      },
    };
    
    return <NavigationButton { ...buttonProps }/>;
  }
}
