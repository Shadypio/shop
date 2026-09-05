import { v2 as cloudinary } from 'cloudinary';
import type { ImageStorageService, UploadableFile } from './image-storage.types.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class CloudinaryImageStorageService implements ImageStorageService {
  upload(file: UploadableFile, folder: string): Promise<{ url: string }> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: `shop/${folder}`, resource_type: 'image' },
        (error, result) => {
          if (error || !result) return reject(error ?? new Error('Upload Cloudinary fallito'));
          resolve({ url: result.secure_url });
        },
      );
      stream.end(file.buffer);
    });
  }
}
