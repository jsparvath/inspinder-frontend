// import { ApolloConsumer } from 'react-apollo';
import { Avatar, AppBar, Toolbar, IconButton, Button, Dialog, DialogContent } from '@material-ui/core';
import { AddCircle, ArrowBack } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import User from '../user/User';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { TOGGLE_LOGIN } from '../../localState/localMutations';
import { Mutation } from 'react-apollo';
import { ApolloConsumer } from 'react-apollo';

const styles = (theme) => ({
	appBar: {},
	createButton: {},
	avatar: {
		backgroundColor: theme.palette.primary.light
	},
	toolbar: { display: 'flex', padding: '0 2em', justifyContent: 'space-between' },
	iconButton: { position: 'relative', left: -15 },
	loginButtons: {
		marginLeft: 'auto'
	}
});

function getCreate({ path, classes }) {
	if (!path.includes('/create') && !path.includes('/update')) {
		return (
			<Link prefetch href="/create">
				<a>
					<IconButton className={classes.iconButton} aria-label="create post">
						<AddCircle color="secondary" className={classes.createButton} />
					</IconButton>
				</a>
			</Link>
		);
	} else {
		return null;
	}
}
function getBackToPosts({ path, classes }) {
	if (path && path !== '/' && path !== '/index') {
		return (
			<Link prefetch href="/">
				<a>
					<IconButton className={classes.iconButton} aria-label="Go to home page">
						<ArrowBack color="secondary" className={classes.createButton} />
					</IconButton>
				</a>
			</Link>
		);
	} else {
		return null;
	}
}
const Header = (props) => {
	const { classes } = props;
	const path = props.router.asPath;

	return (
		<AppBar position="static" className={classes.appBar}>
			<Toolbar className={classes.toolbar}>
				<User>
					{({ data: { me }, loading, error }) => {
						// if (loading) return null;
						if (error) return null;
						if (me) {
							return (
								<React.Fragment>
									{getCreate({ path, classes })}
									{getBackToPosts({ path, classes })}
									<Avatar className={classes.avatar}>
										{(me.name[0] && me.name[0].toUpperCase()) || '?'}
									</Avatar>
								</React.Fragment>
							);
						} else {
							return (
								<Mutation mutation={TOGGLE_LOGIN}>
									{(toggleLogin) => {
										return (
											<div className={classes.loginButtons}>
												<Button
													onClick={(e) => {
														e.preventDefault();
														toggleLogin({
															variables: { loginIsOpen: true, signupIsOpen: false }
														});
													}}
													color="secondary"
												>
													Log in
												</Button>
												<Button
													onClick={(e) => {
														e.preventDefault();
														toggleLogin({
															variables: { loginIsOpen: false, signupIsOpen: true }
														});
													}}
													variant="contained"
													color="secondary"
												>
													Sign up
												</Button>
											</div>
										);
									}}
								</Mutation>
							);
						}
					}}
				</User>
			</Toolbar>
		</AppBar>
	);
};

const conEstilo = withStyles(styles)(Header);
export default withRouter(conEstilo);
