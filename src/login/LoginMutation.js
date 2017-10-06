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
        localStorage.setItem('user_id', data.login.user.id);

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
