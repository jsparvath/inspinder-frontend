import React from 'react';
import { Query } from 'react-apollo';
import { GET_TAGS_QUERY } from '../../queries/TagQueries';

import { TextField, Button, Input } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';
import imageCompression from 'browser-image-compression';

import { ReactCreatable } from '../ui/ReactSelect';
import Animated from 'react-select/lib/animated';

const styles = (theme) => ({
	formLayout: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gridGap: '20px',
		flexDirection: 'row',
		width: '100%',
		maxWidth: 650,
		margin: '0 auto',
		position: 'relative',
		padding: '0 20px'
	},
	dropzone: {
		// backgroundColor: 'blue',
		borderWidth: 2,
		borderColor: theme.palette.primary.main,
		borderStyle: 'dashed',
		borderRadius: 5,
		minHeight: '300px',
		height: 'auto',
		'& img': {
			width: '100%'
		}
	},
	inputRow: {
		display: 'flex',
		flexDirection: 'column',
		'& > *': {
			marginBottom: '25px',
			// padding: 0,
			maxHeight: '40px',
			margin: 0

			// background: 'blue'
		}
	},
	textfield: {
		width: '100%'
	},
	description: {
		width: '100%',
		gridColumn: '1 / span 2'
	},
	submitButton: {
		position: 'absolute',
		right: 0,
		bottom: '-50px'
	}
});
class PostForm extends React.Component {
	state = {
		isLoading: this.props.loading,
		imagePreview: '',
		uploadedImage: null,
		tagsHaveChanged: false,
		formState: {
			title: (this.props.post && this.props.post.title) || '',
			description: (this.props.post && this.props.post.description) || '',
			image: (this.props.post && this.props.post.image) || '',
			link: (this.props.post && this.props.post.link) || '',
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
				...this.state.formState,
				tags: tags.map((tag) => tag.value)
			}
		});
	};

	async resizeImage(imageFile) {
		const maxSizeMB = 0.5;
		try {
			const compressedFile = await imageCompression(imageFile, maxSizeMB); // maxSizeMB, maxWidthOrHeight are optional
			return compressedFile;
		} catch (error) {}
	}

	onDrop = async (images) => {
		this.setState({ isLoading: true });
		const image = images[0];
		const resizedImage = await this.resizeImage(image);
		this.setState({ isLoading: false });
		const resizedImageSrc = URL.createObjectURL(resizedImage);
		await this.setState({
			imagePreview: resizedImageSrc,
			uploadedImage: resizedImage
		});
	};

	render() {
		const { classes, submit } = this.props;
		const { title, description, link, image } = this.state.formState;
		return (
			<React.Fragment>
				<form
					onSubmit={(e) => {
						e.preventDefault();
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
						<div className={classes.formLayout}>
							<Dropzone accept="image/*" onDrop={this.onDrop}>
								{({ getRootProps, getInputProps, isDragActive }) => (
									<div {...getRootProps()} className={classes.dropzone}>
										<input {...getInputProps()} />
										<p>Drag'n'drop an image </p>
										{(this.state.imagePreview && <img src={this.state.imagePreview} />) ||
											(image && <img src={image} />)}
									</div>
								)}
							</Dropzone>
							<div className={classes.inputRow}>
								<div>
									{/* <lab  el for="title">Title:</label> */}
									{/* <input name="title" type="text" value={title} onChange={this.handleChange} /> */}
									<TextField
										label="title"
										className={classes.textfield}
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
										className={classes.textfield}
										value={link}
										// variant="outlined"
										onChange={this.handleChange('link')}
									/>
								</div>

								{/* 						
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
									</Query> */}

								<Query query={GET_TAGS_QUERY}>
									{({ data, error, loading }) => {
										const tags = data.tags.map((tag) => ({ value: tag.name, label: tag.name }));
										return (
											<ReactCreatable
												value={this.state.formState.tags.map((tag) => ({
													value: tag,
													label: tag
												}))}
												isMulti
												options={tags}
												animated={Animated()}
												components={Animated()}
												onChange={this.handleChangeTag}
											/>
										);
									}}
								</Query>

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
							{/* <div> */}
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
								className={classes.description}
								multiline
								value={description}
								onChange={this.handleChange('description')}
								variant="outlined"
							/>
							<Button
								className={classes.submitButton}
								type="submit"
								variant="contained"
								color="secondary"
							>
								Submit
							</Button>
							{/* </div> */}
						</div>
						<div>
							{/* <input type="submit" value="Submit" /> */}

							{/* <Input type="submit" value="Submit" /> */}
						</div>
					</fieldset>
				</form>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(PostForm);
