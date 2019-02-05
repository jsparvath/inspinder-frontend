import { gql } from 'apollo-boost';

const GET_TOGGLE_LOGIN = gql`
	{
		loginModal @client {
			loginIsOpen
			signupIsOpen
		}
	}
`;

const ACTIVE_TAGS_LQUERY = gql`
	{
		activeTags @client {
			tags
		}
	}
`;
export { GET_TOGGLE_LOGIN, ACTIVE_TAGS_LQUERY };
