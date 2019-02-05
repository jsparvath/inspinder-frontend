import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { DELETE_POST_MUTATION } from '../../queries/PostMutations';
import { ACTIVE_TAGS_LQUERY } from '../../localState/localQueries';
import { GET_POSTS_BY_TAGS_QUERY } from '../../queries/PostQueries';
import { IconButton, Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
const styles = (theme) => ({
	root: {
		color: theme.palette.secondary.main,
		padding: theme.post.iconButton.padding
	}
});

class DeleteButton extends React.Component {
	state = {
		openDeleteDialog: false
	};
	render() {
		const { classes, postId } = this.props;
		return (
			<Query query={ACTIVE_TAGS_LQUERY}>
				{({ data, loading }) => {
					const { tags } = data.activeTags;
					return (
						<Mutation
							mutation={DELETE_POST_MUTATION}
							variables={{ id: postId }}
							update={(cache, payload) => {
								const data = cache.readQuery({
									query: GET_POSTS_BY_TAGS_QUERY,
									variables: { tagIds: tags }
								});
								data.postsByTags = data.postsByTags.filter(
									(post) => post.id !== payload.data.deletePost.id
								);
								cache.writeQuery({
									query: GET_POSTS_BY_TAGS_QUERY,
									data,
									variables: { tagIds: tags }
								});
							}}
						>
							{(deletePost, { error, loading }) => (
								<React.Fragment>
									<IconButton
										className={classes.root}
										onClick={(e) => {
											e.preventDefault();
											this.setState({
												openDeleteDialog: true
											});
										}}
									>
										<Delete />
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
					);
				}}
			</Query>
		);
	}
}
export default withStyles(styles)(DeleteButton);
