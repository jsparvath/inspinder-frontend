import { withStyles } from '@material-ui/core/styles';
import CreatePost from '../src/components/postform/CreatePost';
const styles = (theme) => ({
	root: {
		textAlign: 'center',
		paddingTop: theme.spacing.unit * 10
	}
});

const create = ({ classes }) => (
	<div className={classes.root}>
		<CreatePost />
	</div>
);

export default withStyles(styles)(create);
