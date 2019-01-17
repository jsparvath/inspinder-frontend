import gql from "graphql-tag";

const GET_POSTS_QUERY = gql`
  query GET_POSTS_QUERY {
    posts {
      id
      title
      description
      link
      image
      tags {
        id
        name
      }
    }
  }
`;

const SINGLE_POST_QUERY = gql`
  query SINGLE_POST_QUERY($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      description
      link
      image
      tags {
        id
        name
      }
    }
  }
`;

export { GET_POSTS_QUERY, SINGLE_POST_QUERY };
