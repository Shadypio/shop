import { categoryRepository } from './category.repository.js';
import { NotFoundError } from '../../middlewares/app-error.js';

function toDto(category: { id: string; name: string; slug: string }) {
  return { id: category.id, name: category.name, slug: category.slug };
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
};
