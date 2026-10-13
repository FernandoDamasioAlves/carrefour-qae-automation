import { describe, expect, it } from 'vitest';
import { AuthClient } from '../src/clients/auth.client';
import { UsersClient } from '../src/clients/users.client';
import { makeUser } from '../src/factories/user.factory';

describe('Authentication API | JWT', () => {
  const auth = new AuthClient();
  const users = new UsersClient();

  it('API-010 | deve autenticar com credenciais válidas', async () => {
    const user = makeUser();
    let userId: string | undefined;

    try {
      const created = await users.create(user);
      expect(created.status).toBe(201);

      userId = created.body._id;
      expect(userId).toEqual(expect.any(String));

      const response = await auth.login(user.email, user.password);

      expect(response.status).toBe(200);
      expect(response.body.authorization)
        .toMatch(/^Bearer .+/);
    } finally {
      if (userId) {
        const cleanup = await users.delete(userId);
        expect(cleanup.status).toBe(200);
      }
    }
  });

  it('API-011 | deve rejeitar senha incorreta', async () => {
    const user = makeUser();
    let userId: string | undefined;

    try {
      const created = await users.create(user);
      expect(created.status).toBe(201);

      userId = created.body._id;
      expect(userId).toEqual(expect.any(String));

      const response = await auth.login(
        user.email,
        'senha-incorreta'
      );

      expect(response.status).toBe(401);
      expect(response.body.message)
        .toBe('Email e/ou senha inválidos');
    } finally {
      if (userId) {
        const cleanup = await users.delete(userId);
        expect(cleanup.status).toBe(200);
      }
    }
  });

  it('API-012 | deve bloquear rota protegida sem token', async () => {
    const response = await auth.getProtectedProducts();

    expect(response.status).toBe(401);
    expect(response.body.message)
      .toMatch(/Token de acesso/i);
  });
});
