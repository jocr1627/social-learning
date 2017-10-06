import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

import { getClassName } from '../css/CssUtils';

import './Post.css';

const displayName = 'Post';

class Post extends Component {
  render() {
    const {
      post,
    } = this.props;
    const divProps = {
      className: getClassName(displayName),
    };

    return (
      <div { ...divProps }>
        { post.text }
      </div>
    );
  }
}

export default createFragmentContainer(
  Post,
  graphql`
    fragment Post_post on Post {
      creation_date
      text
      user_id
    }
`);
