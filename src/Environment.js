import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
import 'whatwg-fetch';

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

export default new Environment({
  network,
  store,
});
