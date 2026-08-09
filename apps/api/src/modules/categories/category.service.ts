import { categoryRepository } from './category.repository.js';
import { AppError, NotFoundError } from '../../middlewares/app-error.js';
import { slugify } from '../../lib/slugify.js';
import type { CreateCategoryInput, UpdateCategoryInput } from './category.schema.js';

function toDto(category: { id: string; name: string; slug: string }) {
  return { id: category.id, name: category.name, slug: category.slug };
}

// Genera uno slug univoco per lo shop aggiungendo un suffisso numerico in
// caso di collisione (es. "detersivi", "detersivi-2", ...).
async function generateUniqueSlug(shopId: string, name: string, excludeId?: string) {
  const base = slugify(name) || 'categoria';
  let candidate = base;
  let attempt = 1;
  // In pratica il numero di categorie per shop è piccolo: un loop sequenziale
  // è più che sufficiente e resta leggibile.
  while (true) {
    const existing = await categoryRepository.findBySlug(shopId, candidate);
    if (!existing || existing.id === excludeId) {
      return candidate;
    }
    attempt += 1;
    candidate = `${base}-${attempt}`;
  }
}

export const categoryService = {
  async listCategories(shopId: string) {
    const categories = await categoryRepository.findAllByShop(shopId);
    return categories.map(toDto);
  },

  async getCategoryBySlug(shopId: string, slug: string) {
    const category = await categoryRepository.findBySlug(shopId, slug);
    if (!category) {
      throw new NotFoundError('Categoria non trovata');
    }
    return toDto(category);
  },

  async createCategory(shopId: string, input: CreateCategoryInput) {
    const slug = await generateUniqueSlug(shopId, input.name);
    const category = await categoryRepository.create(shopId, { name: input.name, slug });
    return toDto(category);
  },

  async updateCategory(shopId: string, id: string, input: UpdateCategoryInput) {
    const existing = await categoryRepository.findById(shopId, id);
    if (!existing) {
      throw new NotFoundError('Categoria non trovata');
    }
    const slug = await generateUniqueSlug(shopId, input.name, id);
    const category = await categoryRepository.update(id, { name: input.name, slug });
    return toDto(category);
  },

  async deleteCategory(shopId: string, id: string) {
    const existing = await categoryRepository.findById(shopId, id);
    if (!existing) {
      throw new NotFoundError('Categoria non trovata');
    }
    const productCount = await categoryRepository.countProducts(id);
    if (productCount > 0) {
      throw new AppError(
        'Impossibile eliminare: la categoria contiene ancora dei prodotti',
        409,
        'CATEGORY_NOT_EMPTY',
      );
    }
    await categoryRepository.delete(id);
  },
};
