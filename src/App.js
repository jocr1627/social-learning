import { MuiThemeProvider } from 'material-ui';
import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import CreateAccountPage from './create-account/CreateAccountPage';
import LoginPage from './login/LoginPage';

const PostsPage = () => <div>Login Succeeded!</div>;

export default class App extends Component {
  render() {
    const userId = localStorage.getItem('user_id');
    const rootRouteProps = {
      exact: true,
      path: '/',
      render: () => userId ? <Redirect to="/posts"/> : <LoginPage/>,
    };
    const createAccountRouteProps = {
      exact: true,
      path: '/createAccount',
      render: () => userId ? <Redirect to="/posts"/> : <CreateAccountPage/>,
    };
    const loginRouteProps = {
      exact: true,
      path: '/login',
      render: () => userId ? <Redirect to="/posts"/> : <LoginPage/>,
    };
    const postsRouteProps = {
      component: PostsPage,
      exact: true,
      path: '/posts',
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
