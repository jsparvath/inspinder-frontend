import Link from 'next/link';
import { IconButton } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
const styles = (theme) => ({
	root: {
		color: theme.palette.secondary.main,
		padding: theme.post.iconButton.padding
	}
});
const EditButton = ({ postId, classes }) => (
	<Link href={{ pathname: '/update', query: { id: postId } }}>
		<a>
			<IconButton className={classes.root}>
				{/* <Edit className={classes.root} /> */}
				<Edit />
			</IconButton>
		</a>
	</Link>
);

export default withStyles(styles)(EditButton);
