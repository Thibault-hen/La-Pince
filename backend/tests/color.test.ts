import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Hono } from 'hono';

// mock de la base de données
// on utilise vi.fn() pour créer un mock de la méthode findMany
const mockFindMany = vi.fn();

// on mock le client de la base de données pour qu'il utilise notre mock
vi.mock('../src/db/client', () => ({
  default: {
    color: {
      findMany: mockFindMany,
    },
  },
}));

describe('Color Router', () => {
  let app: Hono;
  let colorRouter: any;

  // avant chaque test
  beforeEach(async () => {
    vi.resetModules(); // on réinitialise le cache des modules

    // on réimporte le routeur après resetModules pour avoir le mock à jour
    colorRouter = (await import('../src/controllers/color')).default;

    app = new Hono();
    app.route('/api/v1', colorRouter);

    vi.clearAllMocks(); // reset des mocks
  });

  it('should return list of colors', async () => {
    // on simule une réponse de la base de données
    mockFindMany.mockResolvedValue([
      { id: '1', name: 'Blanc', value: '#FFFFFF' },
      { id: '2', name: 'Vert', value: '#22c55e' },
    ]);

    const res = await app.request('/api/v1/color');
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual([
      { id: '1', name: 'Blanc', value: '#FFFFFF' },
      { id: '2', name: 'Vert', value: '#22c55e' },
    ]);
  });

  it('should return empty list if no colors found', async () => {
    mockFindMany.mockResolvedValue([]);

    const res = await app.request('/api/v1/color');
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual([]);
  });
});
