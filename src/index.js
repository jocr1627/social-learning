import {
  FloatingActionButton,
  MuiThemeProvider,
} from 'material-ui';
import {
  ContentAdd,
  ContentRemove,
} from 'material-ui/svg-icons';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';

const DECREMENT = 'DECREMENT';
const INCREMENT = 'INCREMENT';

const reducer = (state = 0, action) => {
  switch(action.type) {
  case DECREMENT:
    return state - 1;
  case INCREMENT:
    return state + 1;
  }
};

const store = createStore(reducer);

class Counter extends Component {
  render() {
    const {
      count,
    } = this.props;

    return <div>{ count }</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    count: state,
  };
};
const CounterContainer = connect(mapStateToProps)(Counter);

class App extends Component {
  render() {
    const decrementButtonProps = {
      onClick: () => store.dispatch({ type: DECREMENT }),
    };
    const incrementButtonProps = {
      onClick: () => store.dispatch({ type: INCREMENT }),
    };
    const providerProps = {
      store,
    };

    return (
      <MuiThemeProvider>
        <Provider { ...providerProps }>
          <div>
            <FloatingActionButton { ...incrementButtonProps }>
              <ContentAdd/>
            </FloatingActionButton>
            <FloatingActionButton { ...decrementButtonProps }>
              <ContentRemove/>
            </FloatingActionButton>
            <CounterContainer/>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

const root = document.querySelector('#root');

render(<App/>, root);
