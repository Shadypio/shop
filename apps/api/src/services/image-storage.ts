import { LocalDiskImageStorageService } from './local-disk-image-storage.service.js';
import type { ImageStorageService } from './image-storage.types.js';

// Punto di composizione unico: per passare a Cloudinary/S3 in futuro basta
// sostituire questa istanza con la nuova implementazione dell'interfaccia.
export const imageStorageService: ImageStorageService = new LocalDiskImageStorageService();
