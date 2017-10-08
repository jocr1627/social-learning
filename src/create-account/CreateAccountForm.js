import {
  GridList,
  GridTile,
  Paper,
  RaisedButton,
  TextField,
} from 'material-ui';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { getClassName } from '../css/CssUtils';
import createUser from '../user/CreateUserMutation';

import './CreateAccountForm.css';

const validate = (rules, ...args) => {
  let errorText = '';

  for (const rule of rules) {
    errorText = rule(...args);

    if (errorText) {
      break;
    }
  }

  return errorText;
};
const lengthRule = (value) => {
  return (value.length >= 6) ?
    '' : 'Password must be at least 6 characters long.';
};
const matchRule = (confirmValue, passwordValue) => {
  return (confirmValue == passwordValue) ?
    '' : 'These passwords do not match.';
};
const numberRule = (value) => {
  return value.match(/[0-9]/) ?
    '' : 'Password must contain at least one number.';
};
const requiredRule = (value) => {
  return value ? '' : 'You can\'t leave this blank.';
};
const specialCharRule = (value) => {
  return value.match(/[^0-9A-Za-z\s]/) ?
    '' : 'Password must contain at least one special character.';
};
const uppercaseRule = (value) => {
  return value.match(/[A-Z]/) ?
    '' : 'Password must contain at least one uppercase letter.';
};
const confirmRules = [
  requiredRule,
  matchRule,
];
const passwordRules = [
  requiredRule,
  lengthRule,
  numberRule,
  specialCharRule,
  uppercaseRule,
];
const usernameRules = [
  requiredRule,
];

const notifications = {
  duplicate: <label style={ { color: '#D80000' } }>Sorry! That account name already exists!</label>,
  error: <label style={ { color: '#D80000' } }>Sorry! We failed to create your account!</label>,
  success: (
    <label style={ { color: '#28A328' } }>
      Your account was created successfully!
      <a href="/login">
        Login.
      </a>
    </label>
  ),
};
const getNotification = (errors) => {  
  if (!errors) {
    return notifications.success;
  } else if (errors.some((error) => error.message.indexOf('duplicate') >= 0)) {
    return notifications.duplicate;
  } else {
    return notifications.error;
  }
};
const getState = (overrides) => {
  return {
    confirmErrorText: '',
    confirmValue: '',
    notification: null,
    passwordErrorText: '',
    passwordValue: '',
    usernameErrorText: '',
    usernameValue: '',
    ...overrides,
  };
};

const buttonText = 'Create';
const confirmLabelText = 'Confirm your password';
const loginText = 'I already have an account.';
const passwordLabelText = 'Password';
const titleText = 'Create Account';
const usernameLabelText = 'Username';

const displayName = 'CreateAccountForm';

export default class CreateAccountForm extends Component {
  static displayName = displayName;
  
  state = getState();

  render() {
    const {
      confirmErrorText,
      confirmValue,
      notification,
      passwordErrorText,
      passwordValue,
      usernameErrorText,
      usernameValue,
    } = this.state;
    const paperProps = {
      className: getClassName(displayName),
      onKeyPress: (key) => {
        if (key.key == 'Enter') {
          
          this.onClickCreateAccount();
        }
      },
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
      errorText: usernameErrorText,
      fullWidth: true,
      name: usernameLabelText,
      onBlur: () => {
        const usernameErrorText = this.getUsernameErrorText();

        this.setState({ usernameErrorText });
      },
      onChange: (event, usernameValue) => {
        return this.setState({ usernameValue });
      },
      value: usernameValue,
    };
    const passwordFieldProps = {
      errorText: passwordErrorText,
      fullWidth: true,
      name: passwordLabelText,
      onBlur: () => {
        const passwordErrorText = this.getPasswordErrorText();

        this.setState({ passwordErrorText });
      },
      onChange: (event, passwordValue) => {
        return this.setState({ confirmValue: '', passwordValue });
      },
      type: 'password',
      value: passwordValue,
    };
    const confirmFieldProps = {
      errorText: confirmErrorText,
      fullWidth: true,
      name: confirmLabelText,
      onBlur: () => {
        const confirmErrorText = this.getConfirmErrorText();

        this.setState({ confirmErrorText });
      },
      onChange: (event, confirmValue) => {
        return this.setState({ confirmValue });
      },
      type: 'password',
      value: confirmValue,
    };
    const buttonTileProps = {
      className: getClassName(displayName, 'button'),
      rows: 2,
    };
    const buttonProps = {
      label: buttonText,
      onClick: this.onClickCreateAccount,
      primary: true,
      ref: (button) => this.button = button, 
    };
    const loginLinkTileProps = {
      className: getClassName(displayName, 'link'),
      rows: 2,
    };
    const loginLinkProps = {
      href: '/login',
    };
    
    return (
      <Paper { ...paperProps }>
        <GridList { ...gridListProps }>
          <GridTile { ...titleTileProps }>
            <label>
              { titleText }
            </label>
          </GridTile>
          <GridTile { ...notificationTileProps }>
            { notification }
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
          <GridTile { ...fieldTileProps }>
            <label>
              { confirmLabelText }
            </label>
            <TextField { ...confirmFieldProps }/>
          </GridTile>
          <GridTile/>
          <GridTile { ...buttonTileProps }>
            <RaisedButton { ...buttonProps }/>
          </GridTile>
          <GridTile { ...loginLinkTileProps }>
            <a { ...loginLinkProps }>
              { loginText }
            </a>
          </GridTile>
        </GridList>
      </Paper>
    );
  }

  onClickCreateAccount= () => {
    ReactDOM.findDOMNode(this.button.refs.container).focus();

    const confirmErrorText = this.getConfirmErrorText();
    const passwordErrorText = this.getPasswordErrorText();
    const usernameErrorText = this.getUsernameErrorText();

    if (confirmErrorText || passwordErrorText || usernameErrorText) {
      this.setState({
        confirmErrorText,
        notification: null,
        passwordErrorText,
        usernameErrorText,
      });
    } else {
      const {
        passwordValue,
        usernameValue,
      } = this.state;
      
      createUser(usernameValue, passwordValue, (data, errors) => {
        const notification = getNotification(errors);        
        const state = getState({ notification });

        this.setState(state);
      });
    }
  };

  getConfirmErrorText = () => {
    const {
      confirmValue,
      passwordValue,
    } = this.state;
    
    return validate(confirmRules, confirmValue, passwordValue);
  };

  getPasswordErrorText = () => {
    const {
      passwordValue,
    } = this.state;
    
    return validate(passwordRules, passwordValue);
  };

  getUsernameErrorText = () => {
    const {
      usernameValue,
    } = this.state;
    
    return validate(usernameRules, usernameValue);
  };
}
