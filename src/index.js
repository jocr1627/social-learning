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

const getCountQuery = `
  {
    count
  }
`;
const setCountQuery = `
  mutation SetCount($count: Int) {
    setCount(count: $count)
  }
`;

const renderApp = (initialCount) => {
  const COUNT_CHANGED = 'COUNT_CHANGED';

  const countChanged = (delta) => {
    return (dispatch, getState) => {
      const count = getState() + delta;

      dispatch({
        payload: count,
        type: 'COUNT_CHANGED',
      });
      
      superagent.post('/graphql')
        .timeout(500)
        .send({
          query: setCountQuery,
          variables: { count },
        })
        .end();
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

superagent.post('/graphql')
  .timeout(500)
  .send({ query: getCountQuery })
  .end((error, response) => {
    if (response.status == 200) {
      const count = response.body.data.count;

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
