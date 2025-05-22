import { uploadToCloudinary } from '../../utils/cloudinary';

const handleImageUpload = async (
    file: Express.Multer.File,
): Promise<string> => {
    if (!file) {
        throw new Error('An image file must be uploaded.');
    }

    const uploadResult = await uploadToCloudinary(file.path);

    return uploadResult.secure_url;
};

export const blogHelper = {
    handleImageUpload,
};
