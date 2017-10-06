import {
  commitMutation,
  graphql,
} from 'react-relay';

import environment from '../Environment';

const mutation = graphql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      post {
        text
        user {
          id
          name
        }
      }
    }
  }
`;

export default function createPost(text, userId, onCompleted) {
  commitMutation(
    environment,
    {
      mutation,
      onCompleted,
      variables: {
        input: {
          text,
          userId,
        },
      },
    }
  );
}
