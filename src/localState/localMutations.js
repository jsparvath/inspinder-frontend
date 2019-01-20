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
export { TOGGLE_LOGIN, TOGGLE_SIGNUP };
