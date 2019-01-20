import { Avatar, AppBar, Toolbar, IconButton, Button, Dialog, DialogContent } from '@material-ui/core';
import { AddCircle, ArrowBack } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import User from '../user/User';
import Link from 'next/link';
import { withRouter } from 'next/router';
const styles = (theme) => ({
	appBar: {},
	createButton: {},
	avatar: {
		backgroundColor: theme.palette.primary.light
	},
	toolbar: { display: 'flex', padding: '0 2em', justifyContent: 'space-between' },
	iconButton: { position: 'relative', left: -15 }
});

function getCreate({ path, classes }) {
	if (!path.includes('/create') && !path.includes('/update')) {
		return (
			<Link href="/create">
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
			<Link href="/">
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
				{getCreate({ path, classes })}
				{getBackToPosts({ path, classes })}
				<User>
					{({ data: { me }, loading, error }) => {
						if (loading) return null;
						if (error) return null;
						if (me) {
							return <Avatar className={classes.avatar}>{me.name[0].toUpperCase()}</Avatar>;
						} else {
							console.log('not logged in');
							return (
								<div>
									<Button color="secondary">Log in</Button>
									<Button variant="contained" color="secondary">
										Sign up
									</Button>
								</div>
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
