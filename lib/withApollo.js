import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { ENDPOINT_DEV, ENDPOINT_PROD } from '../config';

function createClient({ headers }) {
	return new ApolloClient({
		uri: process.env.NODE_ENV === 'development' ? new Url(ENDPOINT_DEV) : new Url(ENDPOINT_PROD),
		request: (operation) => {
			operation.setContext({
				fetchOptions: {
					credentials: 'include'
				},
				headers
			});
		}
	});
}

export default withApollo(createClient);
