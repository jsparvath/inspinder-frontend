import withApollo from 'next-with-apollo';
import ApolloClient, { HttpLink } from 'apollo-boost';
import { ENDPOINT_DEV, ENDPOINT_PROD } from '../config';

function createClient({ headers }) {
	const client = new ApolloClient({
		clientState: {
			defaults: {
				loginModal: {
					__typename: 'LoginModal',
					loginIsOpen: false,
					signupIsOpen: false
				}
			},
			resolvers: {
				Query: {},
				Mutation: {
					toggleLogin: (_, { loginIsOpen, signupIsOpen }, { cache }) => {
						cache.writeData({
							data: {
								loginModal: {
									__typename: 'LoginModal',
									loginIsOpen: loginIsOpen,
									signupIsOpen: signupIsOpen
								}
							}
						});
						return null;
					}
				}
			}
		},
		uri: process.env.NODE_ENV === 'development' ? ENDPOINT_DEV : ENDPOINT_PROD,
		// link,
		credentials: 'include',
		request: (operation) => {
			operation.setContext({
				fetchOptions: {
					credentials: 'include'
				},
				headers
			});
		}
	});
	return client;
}

export default withApollo(createClient);
