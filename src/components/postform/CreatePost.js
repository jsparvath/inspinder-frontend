import PostForm from './PostForm';
import { GET_POSTS_QUERY } from '../../queries/PostQueries';
import { Mutation } from 'react-apollo';
import { CREATE_POST_MUTATION } from '../../queries/PostMutations';
import { uploadImage } from '../../../lib/utils';
// import ErrorMessage from '../../ErrorMessage';

const update = (cache, { data: { createPost } }) => {
	try {
		const data = cache.readQuery({
			query: GET_POSTS_QUERY
		});

		data.posts.push(createPost);
		cache.writeQuery({ query: GET_POSTS_QUERY, data });
	} catch (err) {}
};

const PostFormContainer = (props) => (
	<Mutation mutation={CREATE_POST_MUTATION} update={update}>
		{(createPost, { loading, error }) => (
			<React.Fragment>
				{/* {error && <ErrorMessage error={error} />} */}
				<PostForm
					loading={loading}
					error={error}
					submit={async (e, childState) => {
						e.preventDefault();
						const { uploadedImage, formState } = childState;

						const uploadImageRes = await uploadImage(uploadedImage);
						if (uploadImageRes) {
							const imageFile = await uploadImageRes.json();
							formState.image = imageFile.secure_url;
						}
						createPost({ variables: formState });
					}}
				/>
			</React.Fragment>
		)}
	</Mutation>
);

export default PostFormContainer;
