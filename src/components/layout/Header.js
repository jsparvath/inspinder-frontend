import { Avatar, AppBar, Toolbar, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import User from '../user/User';

const styles = (theme) => ({
	appBar: {},
	createButton: {},
	avatar: {
		backgroundColor: theme.palette.primary.light
	},
	toolbar: { display: 'flex', padding: '0 2em', justifyContent: 'space-between' },
	iconButton: { position: 'relative', left: -15 }
});
const Header = ({ classes }) => (
	<AppBar position="static" className={classes.appBar}>
		<Toolbar className={classes.toolbar}>
			<IconButton className={classes.iconButton} aria-label="create post">
				<AddCircle color="secondary" className={classes.createButton} />
			</IconButton>
			<User>
				{({ data: { me }, loading, error }) => {
					if (loading) return null;
					if (error) return null;
					return me && <Avatar className={classes.avatar}>{me.name[0].toUpperCase()}</Avatar>;
				}}
			</User>
		</Toolbar>
	</AppBar>
);

export default withStyles(styles)(Header);
