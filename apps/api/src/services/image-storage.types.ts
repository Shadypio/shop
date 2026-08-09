// Interfaccia minima per lo storage delle immagini prodotto: disaccoppia il
// resto dell'app dal "dove" vengono salvati i file. L'MVP usa il filesystem
// locale (ImageStorageService è comunque necessario perché su Render/Railway
// il filesystem è effimero solo tra i deploy, non durante l'esecuzione: va
// bene per lo sviluppo e per demo, ma va sostituito con un provider esterno
// — es. Cloudinary o Cloudflare R2 — prima di andare in produzione con più
// negozi). Per passare a un altro provider basta scrivere una nuova classe
// che implementa questa interfaccia e cambiarla nel punto di composizione
// (product.routes.ts), senza toccare service/controller.
export interface UploadableFile {
  buffer: Buffer;
  originalName: string;
  mimeType: string;
}

export interface ImageStorageService {
  upload(file: UploadableFile, folder: string): Promise<{ url: string }>;
}
