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
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import superagent from 'superagent';

const root = document.querySelector('#root');

const renderApp = (initialCount) => {
  const COUNT_CHANGED = 'COUNT_CHANGED';

  const countChanged = (delta) => {
    return (dispatch, getState) => {
      const count = getState() + delta;

      dispatch({
        payload: count,
        type: 'COUNT_CHANGED',
      });
      
      superagent.post('/db/count').timeout(500).send({ count }).end(() => {
        superagent.get('/db/count')
          .timeout(500)
          .end((error, response) => {
            dispatch({
              payload: response.body.rows[0].count,
              type: 'COUNT_CHANGED',
            });
          });
      });
    };
  };

  const reducer = (state = initialCount, action) => {
    switch(action.type) {
    case COUNT_CHANGED:
      return action.payload;
    default:
      return state;
    }
  };

  const middleware = applyMiddleware(thunk);
  const store = createStore(reducer, middleware);

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
        onClick: () => store.dispatch(countChanged(-1)),
      };
      const incrementButtonProps = {
        onClick: () => store.dispatch(countChanged(1)),
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

  render(<App/>, root);
};

superagent.get('/db/count')
  .timeout(500)
  .end((error, response) => {
    if (response.status == 200) {
      const count = response.body.rows[0].count;

      renderApp(count);
    } else {
      const failureMessage = `DB Request Failed: ${response.status}`;
      const failureDiv = (
        <div>
          <div>
            { failureMessage }
          </div>
          <div>
            { response.responseText }
          </div>
        </div>
      );
    
      render(failureDiv, root);
    }
  });
