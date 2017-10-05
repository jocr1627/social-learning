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
import {
  commitMutation,
  graphql,
  QueryRenderer,
} from 'react-relay';
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

const root = document.querySelector('#root');
const counterId = 1;

const source = new RecordSource();
const store = new Store(source);
const fetchQuery = (operation, variables) => {
  return fetch('/graphql', {
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
  }).then(response => response.json());
};
const network = Network.create(fetchQuery);
const environment = new Environment({
  network,
  store,
});

const counterQuery = graphql`
  query srcQuery($id: ID!) {
    counter(id: $id) {
      count
    }
  }
`;
const setCountMutation = graphql`
  mutation srcMutation($id: ID!, $count: Int) {
    setCount(id: $id, count: $count) {
      count
    }
  }
`;

const countChanged = (count) => {
  commitMutation(
    environment,
    {
      mutation: setCountMutation,
      updater: (store) => {
        const counterRef = store.get(counterId);

        counterRef.setValue(count, 'count'); 
      },
      variables: { count, id: counterId },
    }
  );
};

class App extends Component {
  render() {
    const queryRendererProps = {
      environment,
      query: counterQuery,
      variables: { id: counterId },
      render: ({ props }) => {
        if (!props) {
          return null;
        }

        const {
          counter: {
            count,
          },
        } = props;
        const incrementButtonProps = {
          onClick: () => countChanged(count + 1),
        };
        const decrementButtonProps = {
          onClick: () => countChanged(count - 1),
        };

        return (
          <MuiThemeProvider>
            <div>
              <FloatingActionButton { ...incrementButtonProps }>
                <ContentAdd/>
              </FloatingActionButton>
              <FloatingActionButton { ...decrementButtonProps }>
                <ContentRemove/>
              </FloatingActionButton>
              <div>{ count }</div>
            </div>
          </MuiThemeProvider>
        );
      },
    };

    return <QueryRenderer { ...queryRendererProps }/>;
  }
}

render(<App/>, root);
