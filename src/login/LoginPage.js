import React, { Component } from 'react';

import { getClassName } from '../css/CssUtils';

import LoginForm from './LoginForm';

import './LoginPage.css';

const displayName = 'LoginPage';

export default class LoginPage extends Component {
  static displayName = displayName;

  render() {
    const divProps = {
      className: getClassName(displayName),
    };
    
    return (
      <div { ...divProps }>
        <LoginForm/>
      </div>
    );
  }
}
