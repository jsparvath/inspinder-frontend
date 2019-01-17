import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../../queries/UserQueries';
import Router from 'next/router';

const RequireSignin = (props) => (
	<Query query={CURRENT_USER_QUERY}>
		{({ data: { me } }) => {
			if (!me) {
				if (process.browser) {
					Router.push('/');
					return null;
				}
				return null;
			}
			return props.children;
		}}
	</Query>
);
export default RequireSignin;
