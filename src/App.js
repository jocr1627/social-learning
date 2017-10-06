import { MuiThemeProvider } from 'material-ui';
import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import CreateAccountPage from './create-account/CreateAccountPage';
import LoginPage from './login/LoginPage';
import PostsPage from './posts/PostsPage';

export default class App extends Component {
  render() {
    const homeRedirectProps = {
      to: '/posts',
    };
    const homeRedirect = <Redirect { ...homeRedirectProps }/>;
    const loginRedirectProps = {
      to: '/login',
    };
    const loginRedirect = <Redirect { ...loginRedirectProps }/>;
    const rootRouteProps = {
      exact: true,
      path: '/',
      render: () => localStorage.getItem('user_id') ? homeRedirect : <LoginPage/>,
    };
    const createAccountRouteProps = {
      exact: true,
      path: '/createAccount',
      render: () => localStorage.getItem('user_id') ? homeRedirect : <CreateAccountPage/>,
    };
    const loginRouteProps = {
      exact: true,
      path: '/login',
      render: () => localStorage.getItem('user_id') ? homeRedirect : <LoginPage/>,
    };
    const postsRouteProps = {
      exact: true,
      path: '/posts',
      render: () => localStorage.getItem('user_id') ? <PostsPage/> : loginRedirect,
    };

    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <Switch>
            <Route { ...rootRouteProps }/>
            <Route { ...createAccountRouteProps }/>
            <Route { ...loginRouteProps }/>
            <Route { ...postsRouteProps }/>
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}
