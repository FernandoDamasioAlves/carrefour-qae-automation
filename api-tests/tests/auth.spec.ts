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

  it('API-013 | deve aceitar token válido em rota protegida', async () => {
    const user = makeUser({ administrador: 'true' });
    let userId: string | undefined;

    try {
      const created = await users.create(user);

      expect(created.status).toBe(201);
      userId = created.body._id;

      const login = await auth.login(user.email, user.password);

      expect(login.status).toBe(200);
      expect(login.body.authorization).toMatch(/^Bearer .+/);

      const response = await auth.getProtectedProducts(
        login.body.authorization
      );

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('nome');
    } finally {
      if (userId) {
        await users.delete(userId);
      }
    }
  });

});
