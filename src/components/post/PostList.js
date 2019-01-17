import { Query } from 'react-apollo';
import { GET_POSTS_QUERY } from '../../queries/PostQueries';
import Masonry from './Masonry';
import Post from './Post';

let brakePoints = [ 450, 700, 900 ];
const PostList = (props) => (
	<Query query={GET_POSTS_QUERY}>
		{({ data, error, loading }) => (
			<Masonry brakePoints={brakePoints}>
				{data.posts.map((post) => {
					return <Post key={post.id} image={post.image} thumbnailType="img" />;
				})}
			</Masonry>
			// {/* This is post list
			// <Post image="https://picsum.photos/200/300/?random" thumbnailType="img" /> */}
		)}
	</Query>
);

export default PostList;
