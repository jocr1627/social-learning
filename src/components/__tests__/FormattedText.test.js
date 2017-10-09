import React from 'react';
import renderer from 'react-test-renderer';

import FormattedText from '../FormattedText';

describe('FormattedText', () => {
  it('replaces newlines with <br/>', () => {
    const text = `
      Consider, once more, the universal cannibalism of the sea; all whose creatures prey upon each other, carrying on eternal war since the world began.
      
      Consider all this; and then turn to the green, gentle, and most docile earth; consider them both, the sea and the land; and do you not find a strange analogy to something in yourself?
    `;
    const formattedTextProps = {
      text,
    };
    const dom = renderer.create(
      <FormattedText { ...formattedTextProps }/>
    ).toJSON();
  
    expect(dom).toMatchSnapshot();
  });

  it('replaces urls with <a/>', () => {
    const text = `
      Try out our recipes at http://delicious-fries.com.
      In need of a change? www.dime-to-exercise.net.
      We knew you'd be back https://www.burgertopia.org/menu?time=lunch
    `;
    const formattedTextProps = {
      text,
    };
    const dom = renderer.create(
      <FormattedText { ...formattedTextProps }/>
    ).toJSON();

    expect(dom).toMatchSnapshot();
  });
});
