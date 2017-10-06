import {
  GridList,
  GridTile,
  Paper,
  RaisedButton,
  TextField,
} from 'material-ui';
import React, { Component } from 'react';

import { getClassName } from '../css/CssUtils';

import createPost from './CreatePostMutation';

import './PostForm.css';

const buttonText = 'Publish';
const hintText = 'Post a link to a resource that has helped you learn something cool!';
const titleText = 'Create Post';

const notifications = {
  error: <label style={ { color: '#D80000'} }>Your post failed to publish!</label>,
  success: <label style={ { color: '#28A328'} }>Post published!</label>,
};
const getNotification = (errors) => {  
  if (!errors) {
    return notifications.success;
  } else {
    return notifications.errors;
  }
};

const displayName = 'PostForm';

export default class PostForm extends Component {
  static displayName = displayName;
  
  state = {
    notification: null,
    postValue: '',
  };

  render() {
    const {
      notification,
      postValue,
    } = this.state;
    const paperProps = {
      className: getClassName(displayName),
      zDepth: 2,
    };
    const gridListProps = {
      cellHeight: 10,
      className: getClassName(displayName, 'grid'),
      cols: 1,
      padding: 0,
    };
    const titleTileProps = {
      className: getClassName(displayName, 'title'),
      rows: 3,
    };
    const notificationTileProps = {
      className: getClassName(displayName, 'notification'),
      rows: 2,
    };
    const fieldTileProps = {
      rows: 14,
    };
    const fieldProps = {
      fullWidth: true,
      hintStyle: {
        padding: '0.5rem',
        top: '0.8rem',
      },
      hintText,
      textareaStyle: {
        border: '0.08rem solid lightgray',
        padding: '0.5rem',
      },
      multiLine: true,
      name: titleText,
      onBlur: () => this.setState({ notification: null }),
      onChange: (event, postValue) => this.setState({ postValue }),
      rows: 5,
      rowsMax: 5,
      underlineShow: false,
      value: postValue,
    };
    const buttonTileProps = {
      className: getClassName(displayName, 'button'),
      rows: 4,
    };
    const buttonProps = {
      disabled: !postValue,
      label: buttonText,
      onClick: () => {
        const { postValue } = this.state;
        const userId = localStorage.getItem('userId');

        if (postValue && userId) {
          createPost(postValue, userId, (data, errors) => {
            const notification = getNotification(errors);
            const newPostValue = errors ? postValue : '';

            this.setState({ notification, postValue: newPostValue });
          });
        }
      },
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
          <GridTile { ...notificationTileProps }>
            { notification }
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
