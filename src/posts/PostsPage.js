import React, { Component } from 'react';
import { graphql, QueryRenderer } from 'react-relay';

import LogoutButton from '../components/LogoutButton';
import { getClassName } from '../css/CssUtils';
import environment from '../Environment';

import PostForm from './PostForm';
import PostsList from './PostsList';

import './PostsPage.css';

const query = graphql`
  query PostsPageQuery($count: Int!) {
    viewer {
      ...PostsList_viewer
    }
  }
`;

const displayName = 'PostsPage';

export default class PostsPage extends Component {
  static displayName = displayName;

  render() {
    const queryRendererProps = {
      environment,
      query,
      render: ({ props }) => {
        if (!props) {
          return <div>Loading...</div>;
        }
        
        const {
          viewer,
        } = props;
        const formContainerProps = {
          className: getClassName(displayName, 'form'),
        };
        const listContainerProps = {
          className: getClassName(displayName, 'list'),
        };
        const postsListProps = {
          viewer,
        };
    
        return (
          <div>
            <LogoutButton/>
            <div { ...formContainerProps }>
              <PostForm/>
            </div>
            <div { ...listContainerProps }>
              <PostsList { ...postsListProps }/>
            </div>
          </div>
        );
      },
      variables: {
        count: 1,
      },
    };

    return <QueryRenderer { ...queryRendererProps }/>;
  }
}
