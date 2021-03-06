import Login from '../src/components/login/Login';
import Signup from '../src/components/login/Signup';
import User from '../src/components/user/User';
import Router from 'next/router';
const login = (props) => (
	<User>
		{({ data, loading, error }) => {
			{
				if (error) return <p>Error!</p>;
			}
			if (!data.me) {
				return (
					<React.Fragment>
						<Login />
						<Signup />
					</React.Fragment>
				);
			} else {
				if (process.browser) {
					Router.push('/');
					return null;
				} else {
					return null;
				}
			}
		}}
	</User>
);

export default login;
