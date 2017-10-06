import {
  GridList,
  GridTile,
  Paper,
  RaisedButton,
  TextField,
} from 'material-ui';
import React, { Component } from 'react';

import { getClassName } from '../css/CssUtils';

import './PostForm.css';

const buttonText = 'Publish';
const hintText = 'Post a link to a resource that has helped you learn something cool!';
const titleText = 'Create Post';

const displayName = 'PostForm';

export default class PostForm extends Component {
  static displayName = displayName;
  
  state = {
    postValue: '',
  };

  render() {
    const {
      postValue,
    } = this.state;
    const paperProps = {
      className: getClassName(displayName),
      zDepth: 2,
    };
    const gridListProps = {
      cellHeight: 20,
      className: getClassName(displayName, 'grid'),
      cols: 1,
    };
    const titleTileProps = {
      className: getClassName(displayName, 'title'),
      rows: 2,
    };
    const fieldTileProps = {
      className: getClassName(displayName, 'field'),
      rows: 5,
    };
    const fieldProps = {
      fullWidth: true,
      hintText,
      multiLine: true,
      name: titleText,
      onChange: (event, postValue) => this.setState({ postValue }),
      rows: 1,
      rowsMax: 5,
      underlineShow: false,
      value: postValue,
    };
    const buttonTileProps = {
      className: getClassName(displayName, 'button'),
      rows: 2,
    };
    const buttonProps = {
      label: buttonText,
      primary: true,
      type: 'raised',
    };

    return (
      <Paper { ...paperProps }>
        <GridList { ...gridListProps }>
          <GridTile { ...titleTileProps }>
            <label>
              { titleText }
            </label>
          </GridTile>
          <GridTile { ...fieldTileProps }>
            <TextField { ...fieldProps }/>
          </GridTile>
          <GridTile/>
          <GridTile { ...buttonTileProps }>
            <RaisedButton { ...buttonProps }/>
          </GridTile>
        </GridList>
      </Paper>
    );
  }
}
