import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

import { getClassName } from '../css/CssUtils';

import FormattedText from '../components/FormattedText';

import './Post.css';

const displayName = 'Post';

class Post extends Component {
  render() {
    const {
      post,
    } = this.props;
    const containerProps = {
      className: getClassName(displayName),
    };
    const formattedTextProps = {
      text: post.text,
    };
    // const contentProps = {
    //   className: getClassName(displayName, 'content'),
    // };
    // const children = [];
    
    // let text = post.text;
    // let match = urlRegex.exec(text);

    // while (match) {
    //   const url = match[0];
      
    //   const rawText = text.substr(0, match.index);
    //   const rawTextDiv = <div { ...contentProps }>{ rawText }</div>;
    //   const link = (
    //     <div { ...contentProps }>
    //       <a href={ url }>{ url }</a>
    //     </div>
    //   );

    //   children.push(rawTextDiv);
    //   children.push(link);

    //   text = text.substr(match.index + url.length);
    //   match = urlRegex.exec(text);
    // }

    // const rawTextDiv = <div{ ...contentProps }>{ text }</div>;

    // children.push(rawTextDiv);

    return (
      <div { ...containerProps }>
        <FormattedText { ...formattedTextProps }/>
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
