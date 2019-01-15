import { AppBar, Toolbar } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
	appBar: {},
	createButton: {}
});
const Header = ({ classes }) => (
	<AppBar position="static" className={classes.appBar}>
		<Toolbar>
			<AddCircle color="secondary" className={classes.createButton} />
		</Toolbar>
	</AppBar>
);

export default withStyles(styles)(Header);
