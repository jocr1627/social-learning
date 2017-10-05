import React, { Component } from 'react';

import { getClassName } from '../css/CssUtils';

import CreateAccountForm from './CreateAccountForm';

import './CreateAccountPage.css';

const displayName = 'CreateAccountPage';

export default class CreateAccountPage extends Component {
  static displayName = displayName;

  render() {
    const divProps = {
      className: getClassName(displayName),
    };
    
    return (
      <div { ...divProps }>
        <CreateAccountForm/>
      </div>
    );
  }
}
