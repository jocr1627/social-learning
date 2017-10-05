import { MuiThemeProvider } from 'material-ui';
import React, { Component } from 'react';

import CreateAccountPage from './create-account/CreateAccountPage';

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <CreateAccountPage/>
      </MuiThemeProvider>
    );
  }
}
