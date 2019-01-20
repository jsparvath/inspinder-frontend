import { withStyles } from '@material-ui/core/styles';
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	IconButton,
	Dialog,
	DialogTitle,
	DialogActions,
	Button
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { Collapse } from 'react-collapse';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { DELETE_POST_MUTATION } from '../../queries/PostMutations';
import { GET_POSTS_QUERY } from '../../queries/PostQueries';
const styles = (theme) => ({
	// card: { maxWidth: 100 }
	card: {
		backgroundColor: theme.palette.bcSurface.main,
		color: theme.palette.bcSurface.contrastText,
		textAlign: 'left'
	},
	// icon: { color: theme.customColors.iconPrimary }
	icon: { color: theme.palette.secondary.main }
	// text: { color: theme.palette.primary.contrastText }
	// media: { height: 0, paddingTop: '58%' }
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
						<Link href={{ pathname: '/update', query: { id: postId } }}>
							<a>
								<IconButton>
									<Edit className={classes.icon} />
								</IconButton>
							</a>
						</Link>
						<Mutation
							mutation={DELETE_POST_MUTATION}
							variables={{ id: postId }}
							update={(cache, payload) => {
								const data = cache.readQuery({
									query: GET_POSTS_QUERY
								});
								data.posts = data.posts.filter((post) => post.id !== payload.data.deletePost.id);
								cache.writeQuery({ query: GET_POSTS_QUERY, data });
							}}
						>
							{(deletePost, { error, loading }) => (
								<React.Fragment>
									<IconButton
										onClick={(e) => {
											e.preventDefault();
											this.setState({
												openDeleteDialog: true
											});
										}}
									>
										<Delete className={classes.icon} />
									</IconButton>
									<Dialog
										open={this.state.openDeleteDialog}
										onClose={() => {
											this.setState({ openDeleteDialog: false });
										}}
										aria-labelledby="alert-dialog-title"
									>
										<DialogTitle id="alert-dialog-title">
											Are you sure you want to delete this post?
										</DialogTitle>
										<DialogActions>
											<Button
												onClick={() => {
													this.setState({ openDeleteDialog: false });
													deletePost();
												}}
												color="primary"
											>
												Delete
											</Button>
											<Button
												autoFocus
												onClick={() => {
													this.setState({ openDeleteDialog: false });
												}}
											>
												Cancel
											</Button>
										</DialogActions>
									</Dialog>
								</React.Fragment>
							)}
						</Mutation>
						{title && <Typography variant="h6" component="p" />}
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
