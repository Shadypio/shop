import bcrypt from 'bcryptjs';
import { authRepository } from './auth.repository.js';
import { AppError } from '../../middlewares/app-error.js';
import type { LoginInput } from './auth.schema.js';

function toDto(admin: { id: string; email: string }) {
  return { id: admin.id, email: admin.email };
}

export const authService = {
  async login(input: LoginInput) {
    const admin = await authRepository.findByEmail(input.email);
    // Messaggio generico volutamente identico per email inesistente o password
    // errata: non rivelare a un attaccante se un'email è registrata.
    if (!admin) {
      throw new AppError('Email o password non corretti', 401, 'INVALID_CREDENTIALS');
    }

    const passwordMatches = await bcrypt.compare(input.password, admin.passwordHash);
    if (!passwordMatches) {
      throw new AppError('Email o password non corretti', 401, 'INVALID_CREDENTIALS');
    }

    return toDto(admin);
  },

  async getById(id: string) {
    const admin = await authRepository.findById(id);
    if (!admin) {
      return null;
    }
    return toDto(admin);
  },
};
