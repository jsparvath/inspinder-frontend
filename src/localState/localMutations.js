import { gql } from 'apollo-boost';

const TOGGLE_LOGIN = gql`
	mutation toggleLogin($loginIsOpen: Boolean, $signupIsOpen: Boolean) {
		toggleLogin(loginIsOpen: $loginIsOpen, signupIsOpen: $signupIsOpen) @client
	}
`;

const TOGGLE_SIGNUP = gql`
	mutation($signupIsOpen: Boolean) {
		toggleSignup(signupIsOpen: $signupIsOpen) @client
	}
`;

const CHANGE_TAGS = gql`
	mutation changeTags($tags: [String!]!) {
		changeTags(tags: $tags) @client
	}
`;
export { TOGGLE_LOGIN, TOGGLE_SIGNUP, CHANGE_TAGS };
