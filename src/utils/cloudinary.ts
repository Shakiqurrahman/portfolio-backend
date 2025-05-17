import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { config } from '../config/config';

cloudinary.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
    secure_url: string;
    file_name: string;
    size: number;
}

export const uploadToCloudinary = async (
    filePath: string,
    fileName?: string,
): Promise<CloudinaryUploadResult> => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            transformation: [
                { width: 800, crop: 'limit' },
                { quality: 'auto' },
                { fetch_format: 'auto' },
            ],
        });

        return {
            secure_url: result.secure_url,
            file_name: fileName || result.original_filename,
            size: result.bytes,
        };
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Error uploading image to Cloudinary');
    } finally {
        fs.unlinkSync(filePath);
    }
};
