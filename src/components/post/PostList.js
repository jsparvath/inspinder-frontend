import { Query } from 'react-apollo';
import { GET_POSTS_BY_TAGS_QUERY } from '../../queries/PostQueries';
import { ACTIVE_TAGS_LQUERY } from '../../localState/localQueries';
import { withStyles } from '@material-ui/core/styles';
import Masonry from './Masonry';
import Post from './Post';
import NoSsr from '@material-ui/core/NoSsr';

let brakePoints = [];
// let brakePoints = [ 510, 780, 1020, 1275, 1540 ];

const styles = (theme) => {
	for (let i = 1; i < 20; i++) {
		let gap = i * 2 * theme.postList.masonryGap;
		let width = (i + 1) * theme.postList.masonryItemWidth;
		brakePoints.push(gap + width);
	}
};
const PostList = (props) => (
	<Query query={ACTIVE_TAGS_LQUERY}>
		{({ data, loading }) => {
			const { tags } = data.activeTags;
			return (
				<Query query={GET_POSTS_BY_TAGS_QUERY} fetchPolicy="network-only" variables={{ tagIds: tags }}>
					{({ data, error, loading }) => {
						if (error) return <p>Error</p>;
						// if (loading) return <p>Loading</p>;
						return (
							<Masonry brakePoints={brakePoints}>
								{data.postsByTags.map((post) => {
									return (
										<Post
											key={post.id}
											postId={post.id}
											image={post.image}
											title={post.title}
											link={post.link}
											description={post.description}
											thumbnailType="img"
										/>
									);
								})}
							</Masonry>
						);
						// {/* This is post list
						// <Post image="https://picsum.photos/200/300/?random" thumbnailType="img" /> */}
					}}
				</Query>
			);
		}}
	</Query>
);

export default withStyles(styles)(PostList);
