import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@material-ui/core';
import { Collapse } from 'react-collapse';
import Link from 'next/link';
import { Mutation, Query } from 'react-apollo';
import DeleteButton from '../ui/DeleteButton';
import EditButton from '../ui/EditButton';
const styles = (theme) => ({
	card: {
		backgroundColor: theme.palette.bcSurface.main,
		color: theme.palette.bcSurface.contrastText,
		textAlign: 'left',
		position: 'relative'
	},
	iconButtons: {
		postition: 'relative',
		left: '50px'
		// background: 'red'
	}
});
class Post extends React.Component {
	state = {
		expanded: false,
		openDeleteDialog: false
	};

	render() {
		const { classes, image, thumbnailType, title, description, link, postId } = this.props;
		return (
			<React.Fragment>
				<Card
					className={classes.card}
					onMouseEnter={() => this.setState({ expanded: true })}
					onMouseLeave={() => this.setState({ expanded: false })}
				>
					{image && <CardMedia component={thumbnailType} className={classes.media} image={image} />}
					<CardContent>
						<div className={classes.iconButtons}>
							<EditButton className={classes.button} postId={postId} />
							<DeleteButton postId={postId} />
						</div>
						{title && (
							<Typography variant="h6" component="p">
								{title}
							</Typography>
						)}
						{link && (
							<Typography className={classes.text} variant="body1" component="p">
								{link}
							</Typography>
						)}
					</CardContent>
					<Collapse isOpened={this.state.expanded}>
						<CardContent>
							{description && (
								<Typography className={classes.text} variant="body1" component="p">
									{description}
								</Typography>
							)}
						</CardContent>
					</Collapse>
				</Card>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(Post);
