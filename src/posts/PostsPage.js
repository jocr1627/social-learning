import React, { Component } from 'react';

import LogoutButton from '../components/LogoutButton';
import { getClassName } from '../css/CssUtils';

import PostForm from './PostForm';

import './PostsPage.css';

const displayName = 'PostsPage';

export default class PostsPage extends Component {
  static displayName = displayName;

  render() {
    const divProps = {
      className: getClassName(displayName),
    };

    return (
      <div { ...divProps }>
        <PostForm/>
        <LogoutButton/>
      </div>
    );
  }
}
