import { Divider, Paper } from 'material-ui';
import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

import { getClassName } from '../css/CssUtils';

import Post from './Post';

import './PostsList.css';

const displayName = 'PostsList';

class PostsList extends Component {
  static displayName = displayName;

  render() {
    const {
      viewer,
    } = this.props;
    const paperProps = {
      className: getClassName(displayName),
    };
    const posts = viewer.posts.edges.map(({ node }, index) => {
      const postProps = {
        index,
        key: node.__id,
        post: node,
      };
      const dividerProps = {
        key: `${node.__id}-divider`,
      };

      return [
        <Post { ...postProps }/>,
        <Divider { ...dividerProps }/>
      ];
    });

    return <Paper { ...paperProps }>{ posts }</Paper>;
  }
}

export default createFragmentContainer(
  PostsList,
  {
    viewer: graphql`
      fragment PostsList_viewer on Viewer {
        posts(
          first: $count,
          sortColumn: "creation_date",
          sortDirection: DESC
        ) @connection(key: "PostsList_posts") {
          edges {
            node {
              ...Post_post
            }
          }
        }
      }
    `,
  }
);
