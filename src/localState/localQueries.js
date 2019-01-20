import { gql } from 'apollo-boost';

const GET_TOGGLE_LOGIN = gql`
	{
		loginModal @client {
			loginIsOpen
			signupIsOpen
		}
	}
`;
export { GET_TOGGLE_LOGIN };
