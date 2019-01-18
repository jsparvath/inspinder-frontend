import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { ENDPOINT_DEV, ENDPOINT_PROD } from '../config';

function createClient({ headers }) {
	console.log(headers);
	return new ApolloClient({
		uri: process.env.NODE_ENV === 'development' ? ENDPOINT_DEV : ENDPOINT_PROD,
		// uri: `https://inspinder-yoga-prod.herokuapp.com/`
		request: (operation) => {
			operation.setContext({
				fetchOptions: {
					credentials: 'same-origin'
				},
				headers: {
					...headers,
					authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJpbnNwaW5kZXItcHJpc21hQHByb2QiLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTQ3ODM0MjE0LCJleHAiOjE1NDg0MzkwMTR9.c0TqXoHPB-Y_crsjdhCc9hzho_uQLwU_petOWZLlQls`
				}
			});
		}
	});
}

export default withApollo(createClient);
