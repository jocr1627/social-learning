import {
  GridList,
  GridTile,
  TextField,
} from 'material-ui';
import React, { Component } from 'react';

import { getClassName } from '../css/CssUtils';

import NavigationButton from '../components/NavigationButton';
import NavigationPaper from '../components/NavigationPaper';

import login from './LoginMutation';

import './LoginForm.css';

const createAccountText = 'Create Account';
const loginFailedText = 'Sorry! Your login was incorrect!';
const passwordLabelText = 'Password';
const titleText = 'Login';
const usernameLabelText = 'Username';

const displayName = 'LoginForm';

export default class LoginForm extends Component {
  static displayName = displayName;
  
  state = {
    notificationText: '',
    passwordValue: '',
    usernameValue: '',
  };

  render() {
    const {
      notificationText,
      passwordValue,
      usernameValue,
    } = this.state;
    const paperProps = {
      className: getClassName(displayName),
      onKeyPress: this.onClickLoginButton,
      zDepth: 2,
    };
    const gridListProps = {
      cellHeight: 20,
      className: getClassName(displayName, 'grid'),
      cols: 3,
    };
    const notificationTileProps = {
      className: getClassName(displayName, 'notification'),
      cols: 3,
      rows: 1,
    };
    const titleTileProps = {
      className: getClassName(displayName, 'title'),
      cols: 3,
      rows: 1,
    };
    const fieldTileProps = {
      className: getClassName(displayName, 'field'),
      cols: 3,
      rows: 4,
    };
    const usernameFieldProps = {
      fullWidth: true,
      name: usernameLabelText,
      onChange: (event, usernameValue) => this.setState({ usernameValue }),
      value: usernameValue,
    };
    const passwordFieldProps = {
      fullWidth: true,
      name: passwordLabelText,
      onChange: (event, passwordValue) => this.setState({ passwordValue }),
      type: 'password',
      value: passwordValue,
    };
    const buttonTileProps = {
      className: getClassName(displayName, 'button'),
      rows: 2,
    };
    const buttonProps = {
      label: titleText,
      onClick: this.onClickLoginButton,
      primary: true,
      type: 'raised',
    };
    const createAccountLinkTileProps = {
      className: getClassName(displayName, 'link'),
      rows: 2,
    };
    const createAccountLinkProps = {
      href: '/createAccount',
    };

    return (
      <NavigationPaper { ...paperProps }>
        <GridList { ...gridListProps }>
          <GridTile { ...titleTileProps }>
            <label>
              { titleText }
            </label>
          </GridTile>
          <GridTile { ...notificationTileProps }>
            <label>
              { notificationText }
            </label>
          </GridTile>
          <GridTile { ...fieldTileProps }>
            <label>
              { usernameLabelText }
            </label>
            <TextField { ...usernameFieldProps }/>
          </GridTile>
          <GridTile { ...fieldTileProps }>
            <label>
              { passwordLabelText }
            </label>
            <TextField { ...passwordFieldProps }/>
          </GridTile>
          <GridTile/>
          <GridTile { ...buttonTileProps }>
            <NavigationButton { ...buttonProps }/>
          </GridTile>
          <GridTile { ...createAccountLinkTileProps }>
            <a { ...createAccountLinkProps }>
              { createAccountText }
            </a>
          </GridTile>
        </GridList>
      </NavigationPaper>
    );
  }

  onClickLoginButton= (history) => {
    const {
      passwordValue,
      usernameValue,
    } = this.state;
    
    login(usernameValue, passwordValue, (data, errors) => {
      if (errors || !data.login.user) {
        this.setState({ notificationText: loginFailedText });
      } else {
        history.push('/posts');
      }
    });
  };
}
