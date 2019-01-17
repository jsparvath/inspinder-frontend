import gql from "graphql-tag";
const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
    }
  }
`;
const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      email
      name
      permissions
    }
  }
`;


export {CURRENT_USER_QUERY, ALL_USERS_QUERY}
