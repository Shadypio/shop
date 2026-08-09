import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { env } from '../config/env.js';
import type { ImageStorageService, UploadableFile } from './image-storage.types.js';

const extensionByMimeType: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
};

// Implementazione di sviluppo/demo: salva i file sotto apps/api/uploads e li
// serve come file statici (vedi app.ts). Adatta solo per un singolo processo
// long-running con filesystem persistente (va bene in locale; su Render è
// sufficiente finché non si scala su più istanze o si superano i redeploy).
export class LocalDiskImageStorageService implements ImageStorageService {
  private readonly uploadsRoot = path.resolve(process.cwd(), 'uploads');

  async upload(file: UploadableFile, folder: string): Promise<{ url: string }> {
    const extension = extensionByMimeType[file.mimeType] ?? path.extname(file.originalName) ?? '';
    const filename = `${randomUUID()}${extension}`;
    const targetDir = path.join(this.uploadsRoot, folder);
    await mkdir(targetDir, { recursive: true });
    await writeFile(path.join(targetDir, filename), file.buffer);

    const publicPath = `/uploads/${folder}/${filename}`;
    return { url: `${env.API_PUBLIC_URL}${publicPath}` };
  }
}
