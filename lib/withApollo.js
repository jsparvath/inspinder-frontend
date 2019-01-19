import withApollo from 'next-with-apollo';
import ApolloClient, { HttpLink } from 'apollo-boost';
import { ENDPOINT_DEV, ENDPOINT_PROD } from '../config';

function createClient({ headers }) {
	console.log('before apolloclient made');
	// const link = new HttpLink({
	// 	uri: process.env.NODE_ENV === 'development' ? ENDPOINT_DEV : ENDPOINT_PROD
	// });
	const client = new ApolloClient({
		uri: process.env.NODE_ENV === 'development' ? ENDPOINT_DEV : ENDPOINT_PROD,
		// link,
		request: (operation) => {
			operation.setContext({
				fetchOptions: {
					credentials: 'same-origin'
				},
				headers
			});
		}
	});
	console.log('apollo client made');
	return client;
}

export default withApollo(createClient);

// import withApollo from 'next-with-apollo';
// import { ApolloClient, HttpLink } from 'apollo-boost';
// import { ENDPOINT_DEV, ENDPOINT_PROD } from '../config';
// import { InMemoryCache } from 'apollo-cache-inmemory';

// function createClient({ headers }) {
// 	console.log(headers);
// 	const link = new HttpLink({
// 		uri: process.env.NODE_ENV === 'development' ? ENDPOINT_DEV : ENDPOINT_PROD
// 	});
// 	const cache = new InMemoryCache();
// 	return new ApolloClient({
// 		// uri: `https://inspinder-yoga-prod.herokuapp.com/`
// 		link,
// 		cache,
// 		request: (operation) => {
// 			operation.setContext({
// 				fetchOptions: {
// 					credentials: 'include'
// 				},
// 				headers
// 			});
// 		}
// 	});
// }

// export default withApollo(createClient);
