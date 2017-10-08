import getLinkify from 'linkify-it';
import PropTypes from 'proptypes';
import React, { Component } from 'react';
import tlds from 'tlds';

const linkify = getLinkify();

linkify.tlds(tlds);

let lineBreakKeyIndex = 0;

const insertLineBreaks = (text, elements) => {
  const textBlocks = text.split(/\n|\r/);

  textBlocks.forEach((textBlock, index) => {
    if (textBlock) {
      elements.push(textBlock);
    }

    if (index < textBlocks.length - 1) {
      const brProps = {
        key: lineBreakKeyIndex++,
      };
      const br = <br { ...brProps }/>;

      elements.push(br);
    }
  });
};

const getFormattedElements = (text) => {
  const linkMatches = linkify.match(text) || [];
  let elements = [];
  let currentIndex = 0;

  linkMatches.forEach((match, matchIndex) => {
    const linkProps = {
      href: match.url,
      key: matchIndex,
      target: '_blank',
    };
    const link = <a { ...linkProps }>{ match.url }</a>;
    const rawText = text.slice(currentIndex, match.index);
    
    insertLineBreaks(rawText, elements);

    elements.push(link);
    currentIndex = match.lastIndex;    
  });

  insertLineBreaks(text.slice(currentIndex), elements);

  return elements;
};

export default class FormattedText extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  render() {
    const {
      text,
    } = this.props;
    const formattedElements = getFormattedElements(text);

    return <span>{ formattedElements }</span>;
  }
}
