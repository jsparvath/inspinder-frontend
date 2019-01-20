import gql from 'graphql-tag';

const UPDATE_POST_MUTATION = gql`
	mutation UPDATE_POST_MUTATION(
		$id: ID!
		$title: String
		$description: String
		$link: String
		$image: String
		$tags: [String]
	) {
		updatePost(id: $id, title: $title, description: $description, link: $link, image: $image, tags: $tags) {
			id
			title
			description
			link
			image
		}
	}
`;

const DELETE_POST_MUTATION = gql`
	mutation DELETE_POST_MUTATION($id: ID!) {
		deletePost(id: $id) {
			id
		}
	}
`;

const CREATE_POST_MUTATION = gql`
	mutation CREATE_POST_MUTATION(
		$title: String
		$description: String
		$link: String
		$image: String # $largeImage: String
		$tags: [String]
	) {
		createPost(
			title: $title
			description: $description
			link: $link
			image: $image # largeImage: $largeImage
			tags: $tags
		) {
			id
		}
	}
`;

export { UPDATE_POST_MUTATION, DELETE_POST_MUTATION, CREATE_POST_MUTATION };
