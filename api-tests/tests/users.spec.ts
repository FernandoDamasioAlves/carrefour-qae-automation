import { describe, expect, it } from 'vitest';
import { UsersClient } from '../src/clients/users.client';
import { makeUser } from '../src/factories/user.factory';

describe('Users API | CRUD', () => {
  const client = new UsersClient();

  it('API-001 | deve listar usuários', async () => {
    const response = await client.list();

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('quantidade');
    expect(Array.isArray(response.body.usuarios)).toBe(true);
  });

  it('API-002 | deve criar, consultar e excluir usuário', async () => {
    const user = makeUser();
    let userId: string | undefined;

    try {
      const created = await client.create(user);

      expect(created.status).toBe(201);
      expect(created.body).toHaveProperty('_id');

      userId = created.body._id;

      const retrieved = await client.getById(userId!);

      expect(retrieved.status).toBe(200);
      expect(retrieved.body).toMatchObject({
        nome: user.nome,
        email: user.email,
        administrador: user.administrador
      });
    } finally {
      if (userId) {
        const cleanup = await client.delete(userId);
        expect(cleanup.status).toBe(200);
      }
    }
  });
});
