import {
  commitMutation,
  graphql,
} from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

import environment from '../Environment';

const mutation = graphql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      edge {
        node {
          creation_date
          id
          text
          user_id
        }
      }
      viewer {
        id
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
      updater: (store) => {
        const rootField = store.getRootField('createPost');
        const newEdge = rootField.getLinkedRecord('edge');
        const viewer = store.get(0);
        const conn = ConnectionHandler.getConnection(
          viewer,
          'PostsList_posts',
          {
            sortColumn: 'creation_date',
            sortDirection: 'DESC'
          }
        );
      
        ConnectionHandler.insertEdgeBefore(conn, newEdge);
      },
      variables: {
        input: {
          text,
          user_id: userId,
        },
      },
    }
  );
}
