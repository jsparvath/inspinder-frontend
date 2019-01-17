import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia } from '@material-ui/core';

const styles = (theme) => ({
	// card: { maxWidth: 100 }
	// media: { height: 0, paddingTop: '58%' }
});
const Post = (props) => {
	const { classes, image, thumbnailType } = props;
	return (
		<Card className={classes.card}>
			yoyo
			{image && <CardMedia component={thumbnailType} className={classes.media} image={image} />}
		</Card>
	);
};

export default withStyles(styles)(Post);
