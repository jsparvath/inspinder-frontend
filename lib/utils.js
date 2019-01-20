const uploadImage = async (image) => {
	if (image) {
		const formData = new FormData();
		formData.append('file', image);
		formData.append('upload_preset', 'inspinder');

		return fetch('https://api.cloudinary.com/v1_1/inspinder/image/upload', {
			method: 'POST',
			body: formData
		});
	}
	return null;
};

export { uploadImage };
