import {
  commitMutation,
  graphql,
} from 'react-relay';

import environment from '../Environment';

const mutation = graphql`
  mutation LoginMutation($input: LoginInput!) {
    login(input: $input) {
      user {
        id
      }
    }
  }
`;

export default function login(name, password, onCompleted) {
  commitMutation(
    environment,
    {
      mutation,
      onCompleted: (data, ...args) => {
        const id = data.login.user && data.login.user.id;

        if (id) {
          localStorage.setItem('userId', id);
        } else {
          localStorage.removeItem('userId');
        }

        onCompleted(data, ...args);
      },
      variables: {
        input: {
          password,
          name,
        },
      },
    }
  );
}
