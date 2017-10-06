import {
  commitMutation,
  graphql,
} from 'react-relay';

import environment from '../Environment';

const mutation = graphql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
      }
    }
  }
`;

export default function createUser(name, password, onCompleted) {
  commitMutation(
    environment,
    {
      mutation,
      onCompleted,
      variables: {
        input: {
          password,
          name,
        },
      },
    }
  );
}
