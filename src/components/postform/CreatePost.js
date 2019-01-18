import React from 'react';
import { Query } from 'react-apollo';
import { GET_TAGS_QUERY } from '../../queries/TagQueries';

import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';
import ReactSelect from '../ui/ReactSelect';
// import imageCompression from 'browser-image-compression';

import Creatable from 'react-select/lib/Creatable';
import Animated from 'react-select/lib/animated';

const styles = (theme) => ({});
class PostForm extends React.Component {
	state = {
		isLoading: this.props.loading,
		imagePreview: '',
		uploadedImage: null,
		tagsHaveChanged: false,
		formState: {
			title: '',
			description: '',
			image: '',
			link: '',
			tags: this.props.post ? this.props.post.tags.map((tag) => tag.name) : []
		}
	};

	componentWillUnmount() {
		// Make sure to revoke the data uris to avoid memory leaks
		if (this.state.formState.image) {
			URL.revokeObjectURL(this.state.formState.image.preview);
		}
	}

	handleChange = (name) => (e) => {
		const { value } = e.target;
		this.setState({
			formState: {
				...this.state.formState,
				[name]: value
			}
		});
	};

	handleChangeTag = (tags, actionMeta) => {
		this.setState({
			tagsHaveChanged: true,
			formState: {
				tags: tags.map((tag) => tag.value)
			}
		});
	};

	// async resizeImage(imageFile) {
	// 	const maxSizeMB = 1;
	// 	try {
	// 		const compressedFile = await imageCompression(imageFile, maxSizeMB); // maxSizeMB, maxWidthOrHeight are optional
	// 		return compressedFile;
	// 	} catch (error) {}
	// }

	onDrop = async (images) => {
		// this.setState({ isLoading: true });
		// const image = images[0];
		// const resizedImage = await this.resizeImage(image);
		// this.setState({ isLoading: false });
		// const resizedImageSrc = URL.createObjectURL(resizedImage);
		// await this.setState({
		// 	imagePreview: resizedImageSrc,
		// 	uploadedImage: resizedImage
		// });
	};

	render() {
		const { classes } = this.props;
		const { title, description, link, image } = this.state.formState;
		return (
			<React.Fragment>
				<form
					onSubmit={(e) => {
						const theFormState = { ...this.state.formState };
						if (!this.state.tagsHaveChanged) {
							delete theFormState.tags;
						}
						submit(e, {
							uploadedImage: this.state.uploadedImage,
							formState: theFormState
						});
					}}
				>
					<fieldset
						style={{ border: 'none' }}
						disabled={this.state.isLoading}
						aria-busy={this.state.isLoading}
					>
						<div>
							{/* <Dropzone accept="image/*">
								{/* onDrop={this.onDrop} */}
							{/* <p>Drag'n'drop an image </p> */}
							{/* {(this.state.imagePreview && <img width="200" src={this.state.imagePreview} />) || */}
							{/* (image && <img width="200" src={image} />)} */}
							{/* </Dropzone> */}
							<div>
								<div>
									{/* <lab  el for="title">Title:</label> */}
									{/* <input name="title" type="text" value={title} onChange={this.handleChange} /> */}
									<TextField
										label="title"
										className={classes.textField}
										value={title}
										// variant="outlined"
										onChange={this.handleChange('title')}
									/>
								</div>

								<div>
									{/* <label for="link">Link:</label> */}
									<TextField
										label="link"
										// placeholder="Link:"
										className={classes.textField}
										value={link}
										// variant="outlined"
										onChange={this.handleChange('link')}
									/>
									{/* <input
										name="link"
										id="link"
										type="text"
										value={link}
										onChange={this.handleChange}
									/> */}
								</div>

								{/* <label>
									Tags:
									<Query query={GET_TAGS_QUERY}>
										{({ data, error, loading }) => {
											const tags = data.tags.map((tag) => ({ value: tag.name, label: tag.name }));
											return (
												<Creatable
													id="select-creatable"
													instanceId="select-cree"
													value={this.state.formState.tags.map((tag) => ({
														value: tag,
														label: tag
													}))}
													isMulti
													// 	styles={selectStyles}
													components={Animated()}
													DropdownIndicator={() => undefined}
													options={tags}
													onChange={this.handleChangeTag}
												/>
											);
										}}
									</Query>
								</label> */}
								<ReactSelect isMulti animated={Animated()} components={Animated()} />

								{/* <Select
						classes={classes}
						styles={selectStyles}
						textFieldProps={{
							label: 'tags'
							// InputLabelProps: {
							// 	shrink: true
							// }
						}}
						options={suggestions}
						components={components}
						value={this.state.multi}
						onChange={this.handleChange('multi')}
						placeholder={() => undefined}
						// label="yo"
						isMulti
					/> */}
								{/* <input type="submit" value="Submit" /> */}
							</div>
							<div>
								{/* <label for="description">description:</label>
								<textarea
									id="description"
									name="description"
									type="text"
									value={description}
									onChange={this.handleChange}
								/> */}
								<TextField
									label="description"
									multiline
									value={description}
									onChange={this.handleChange('description')}
									variant="outlined"
								/>
							</div>
							<div>
								<input type="submit" value="Submit" />
							</div>
						</div>
					</fieldset>
				</form>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(PostForm);
