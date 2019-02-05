import gql from 'graphql-tag';

const GET_TAGS_QUERY = gql`
	query GET_TAGS_QUERY {
		tags {
			id
			name
			posts {
				id
			}
		}
	}
`;

export { GET_TAGS_QUERY };
