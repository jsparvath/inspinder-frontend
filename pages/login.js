import Login from '../src/components/login/Login';
import Signup from '../src/components/login/Signup';
import User from '../src/components/user/User';
import Router from 'next/router';
const login = (props) => (
	<User>
		{({ data: { me } }) => {
			if (!me) {
				return (
					<React.Fragment>
						<Login />
						<Signup />
					</React.Fragment>
				);
			} else {
				if (process.browser) {
					Router.push('/');
				} else {
					return null;
				}
			}
		}}
	</User>
);

export default login;
