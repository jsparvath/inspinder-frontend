import React, { Component } from 'react';
import { Button, Avatar, FormControl, Input, InputLabel, Paper, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Mutation } from 'react-apollo';
import { LOGIN_MUTATION } from '../../queries/LoginMutations';
import { CURRENT_USER_QUERY } from '../../queries/UserQueries';
import withStyles from '@material-ui/core/styles/withStyles';

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

class Login extends Component {
	state = {
		password: 'yoyo',
		email: 'mymy'
	};

	saveToState = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	render() {
		const { classes } = this.props;
		return (
			<Mutation
				mutation={LOGIN_MUTATION}
				variables={this.state}
				refetchQueries={[ { query: CURRENT_USER_QUERY } ]}
			>
				{(login, { error, loading }) => {
					if (loading) return <p>loading</p>;
					if (error) return <p>Error</p>;
					return (
						<main className={classes.main}>
							<Paper className={classes.paper}>
								<Avatar className={classes.avatar}>
									<LockOutlinedIcon />
								</Avatar>
								<Typography component="h1" variant="h5">
									Login
								</Typography>
								<form
									className={classes.form}
									method="post"
									onSubmit={async (e) => {
										e.preventDefault();
										await login();
									}}
								>
									<FormControl margin="normal" required fullWidth>
										<InputLabel htmlFor="email">Email Address</InputLabel>
										<Input
											id="email"
											name="email"
											value={this.state.email}
											onChange={this.saveToState}
											autoComplete="email"
											autoFocus
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

									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										className={classes.submit}
									>
										Login
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

export default withStyles(styles)(Login);
