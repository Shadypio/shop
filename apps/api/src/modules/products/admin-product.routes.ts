import { Router } from 'express';
import multer from 'multer';
import { asyncHandler } from '../../middlewares/error-handler.js';
import { requireAuth } from '../../middlewares/require-auth.js';
import { adminProductController } from './admin-product.controller.js';

// Upload in memoria: il buffer viene passato direttamente a
// ImageStorageService, che decide dove persisterlo (disco locale oggi,
// Cloudinary/S3 in futuro) senza mai scrivere file temporanei su disco qui.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Il file deve essere un\'immagine'));
      return;
    }
    cb(null, true);
  },
});

export const adminProductRouter = Router();

adminProductRouter.use(requireAuth);

adminProductRouter.get('/', asyncHandler(adminProductController.list));
adminProductRouter.get('/:id', asyncHandler(adminProductController.getById));
adminProductRouter.post('/', asyncHandler(adminProductController.create));
adminProductRouter.patch('/:id', asyncHandler(adminProductController.update));
adminProductRouter.delete('/:id', asyncHandler(adminProductController.remove));
adminProductRouter.post(
  '/:id/images',
  upload.single('image'),
  asyncHandler(adminProductController.uploadImage),
);
adminProductRouter.delete('/:id/images/:imageId', asyncHandler(adminProductController.removeImage));
