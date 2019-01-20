import { withStyles } from '@material-ui/core/styles';
import UpdatePost from '../src/components/postform/UpdatePost';
const styles = (theme) => ({
	root: {
		textAlign: 'center',
		paddingTop: theme.spacing.unit * 10
	}
});

const update = ({ classes, query }) => (
	<div className={classes.root}>
		<UpdatePost id={query.id} />
	</div>
);

export default withStyles(styles)(update);
