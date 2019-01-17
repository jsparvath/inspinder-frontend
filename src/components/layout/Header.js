import { Avatar, AppBar, Toolbar } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import User from '../user/User';

const styles = (theme) => ({
	appBar: {},
	createButton: {},
	avatar: {
		backgroundColor: theme.palette.primary.light
	},
	toolbar: { display: 'flex', padding: '0 2em', justifyContent: 'space-between' }
});
const Header = ({ classes }) => (
	<AppBar position="static" className={classes.appBar}>
		<Toolbar className={classes.toolbar}>
			<AddCircle color="secondary" className={classes.createButton} />
			<User>
				{({ data: { me } }) => {
					console.log(me);
					return me && <Avatar className={classes.avatar}>{me.name[0].toUpperCase()}</Avatar>;
				}}
			</User>
		</Toolbar>
	</AppBar>
);

export default withStyles(styles)(Header);
