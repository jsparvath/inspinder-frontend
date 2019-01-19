import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from '../../queries/UserQueries';

const User = (props) => (
	<Query {...props} query={CURRENT_USER_QUERY}>
		{/* {({ data, error, loading }) => ( */}
		{(payload) => props.children(payload)}
	</Query>
);

User.propTypes = {
	children: PropTypes.func.isRequired
};
export default User;
