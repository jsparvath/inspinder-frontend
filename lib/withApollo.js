import withApollo from 'next-with-apollo';
import ApolloClient, { HttpLink } from 'apollo-boost';
import { ENDPOINT_DEV, ENDPOINT_PROD } from '../config';

function createClient({ headers }) {
	console.log(headers);
	// const link = new HttpLink({
	// 	uri: process.env.NODE_ENV === 'development' ? ENDPOINT_DEV : ENDPOINT_PROD
	// });
	return new ApolloClient({
		uri: `https://inspinder-yoga-prod.herokuapp.com/`,
		// link,
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
