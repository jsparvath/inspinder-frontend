import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { Mutation } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../../queries/UserQueries';
import { SIGNUP_MUTATION } from '../../queries/LoginMutations';

const styles = (theme) => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto'
		}
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.primary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit
	},
	submit: {
		marginTop: theme.spacing.unit * 3
	}
});

class Signup extends Component {
	state = {
		name: '',
		password: '',
		email: ''
	};

	saveToState = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	render() {
		const { classes } = this.props;
		return (
			<Mutation
				mutation={SIGNUP_MUTATION}
				variables={this.state}
				refetchQueries={[ { query: CURRENT_USER_QUERY } ]}
			>
				{(signup, { error, loading }) => {
					// if (loading) return <p>loading</p>;
					if (error) return <p>Error</p>;
					return (
						<main className={classes.main}>
							<Paper className={classes.paper}>
								<Avatar className={classes.avatar}>
									<LockOutlinedIcon />
								</Avatar>
								<Typography component="h1" variant="h5">
									Sign up
								</Typography>
								<form
									className={classes.form}
									method="post"
									onSubmit={async (e) => {
										e.preventDefault();
										await signup();
									}}
								>
									<FormControl margin="normal" required fullWidth>
										<InputLabel htmlFor="name">Name</InputLabel>
										<Input
											name="name"
											value={this.state.name}
											onChange={this.saveToState}
											id="name"
											autoFocus
										/>
									</FormControl>
									<FormControl margin="normal" required fullWidth>
										<InputLabel htmlFor="email">Email Address</InputLabel>
										<Input
											id="email"
											value={this.state.email}
											onChange={this.saveToState}
											name="email"
											autoComplete="email"
										/>
									</FormControl>
									<FormControl margin="normal" required fullWidth>
										<InputLabel htmlFor="password">Password</InputLabel>
										<Input
											name="password"
											type="password"
											id="password"
											value={this.state.password}
											onChange={this.saveToState}
											autoComplete="current-password"
										/>
									</FormControl>

									{/* value={this.state.password}
									onChange={this.saveToState} */}

									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										className={classes.submit}
									>
										Sign up
									</Button>
								</form>
							</Paper>
						</main>
					);
				}}
			</Mutation>
		);
	}
}

export default withStyles(styles)(Signup);
