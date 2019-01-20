import React from 'react';
import { Mutation, Query } from 'react-apollo';

import PostForm from './PostForm';

import { uploadImage } from '../../../lib/utils';

import { SINGLE_POST_QUERY } from '../../queries/PostQueries';
import { UPDATE_POST_MUTATION } from '../../queries/PostMutations';

class UpdatePostContainer extends React.Component {
	render() {
		const { id } = this.props;
		return (
			<Query query={SINGLE_POST_QUERY} variables={{ id: id }}>
				{({ data, loading }) => {
					if (!data || !data.post) return <p>No post found for id {id}</p>;
					return (
						<Mutation mutation={UPDATE_POST_MUTATION}>
							{(updatePost, { loading, error }) => (
								<PostForm
									loading={loading}
									error={error}
									post={data.post}
									submit={async (e, { formState, uploadedImage }) => {
										e.preventDefault();
										if (uploadedImage) {
											const uploadImageRes = await uploadImage(uploadedImage);
											if (uploadImageRes) {
												const imageFile = await uploadImageRes.json();
												formState.image = imageFile.secure_url;
											}
										}
										const res = await updatePost({
											variables: {
												id: id,
												...formState
											}
										});
									}}
								/>
							)}
						</Mutation>
					);
				}}
			</Query>
		);
	}
}
export default UpdatePostContainer;
