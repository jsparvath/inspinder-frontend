import Login from '../login/Login';
import Signup from '../login/Signup';
import { withStyles } from '@material-ui/core/styles';
import { Modal, DialogContent, Typography } from '@material-ui/core';
import { Query, Mutation } from 'react-apollo';
import { GET_TOGGLE_LOGIN } from '../../localState/localQueries';
import { TOGGLE_LOGIN } from '../../localState/localMutations';

const styles = (theme) => ({
	modal: {
		paddingTop: theme.spacing.unit * 15
	}
});

class LandingPage extends React.Component {
	handleClose = () => {
		this.setState({ open: false });
	};
	render() {
		const { classes } = this.props;
		return (
			<Mutation mutation={TOGGLE_LOGIN}>
				{(toggleLogin) => {
					return (
						<Query query={GET_TOGGLE_LOGIN}>
							{({ data, loading }) => {
								// if (loading) return <p>Loading</p>;
								return (
									<div>
										<Typography component="h1" variant="h1">
											Welcome!
										</Typography>
										<Typography variant="body1">Login or Signup to enjoy the goodies!</Typography>
										<Modal
											className={classes.modal}
											open={data.loginModal.loginIsOpen}
											aria-label="Login Dialog"
											onClose={() =>
												toggleLogin({
													variables: { loginIsOpen: false, signupIsOpen: false }
												})}
										>
											<Login />
										</Modal>
										<Modal
											className={classes.modal}
											open={data.loginModal.signupIsOpen}
											aria-label="Signup Dialog"
											onClose={() =>
												toggleLogin({
													variables: { loginIsOpen: false, signupIsOpen: false }
												})}
										>
											<Signup />
										</Modal>
									</div>
								);
							}}
						</Query>
					);
				}}
			</Mutation>
		);
	}
}

export default withStyles(styles)(LandingPage);
