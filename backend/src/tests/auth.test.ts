import { Hono } from 'hono';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';

// Mock de Prisma Client
vi.mock('../db/client', () => ({
  default: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

// Mock d'argon2
vi.mock('argon2', () => ({
  default: {
    verify: vi.fn(),
  },
}));

describe('Auth Router - Login', () => {
  let mockFindUnique: Mock;
  let argon2Verify: Mock;
  let authRouter: any;
  let app: Hono;

  beforeEach(async () => {
    vi.resetModules();

    // Récupération des mocks réels créés par vi.mock
    const prisma = (await import('../db/client')).default;
    mockFindUnique = prisma.user.findUnique as Mock;

    const argon2Module = (await import('argon2')).default;
    argon2Verify = argon2Module.verify as Mock;

    authRouter = (await import('../controllers/auth')).default;

    app = new Hono();
    app.route('/api/v1', authRouter);

    vi.clearAllMocks();
  });

  it('should login successfully', async () => {
    // Simule un utilisateur trouvé en base
    mockFindUnique.mockResolvedValue({
      id: '123',
      email: 'test@example.com',
      password: 'hashed-password',
      name: 'Test User',
    });

    // Simule que le mot de passe est correct
    argon2Verify.mockResolvedValue(true);

    const res = await app.request('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'plain-password',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.user.email).toBe('test@example.com');
  });

  it('should return 401 if user not found', async () => {
    mockFindUnique.mockResolvedValue(null);

    const res = await app.request('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'unknown@example.com',
        password: 'password',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(res.status).toBe(401);
  });

  it('should return 401 if password is invalid', async () => {
    mockFindUnique.mockResolvedValue({
      id: '123',
      email: 'test@example.com',
      password: 'hashed-password',
      name: 'Test User',
    });

    argon2Verify.mockResolvedValue(false);

    const res = await app.request('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'wrong-password',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(res.status).toBe(401);
  });
});
