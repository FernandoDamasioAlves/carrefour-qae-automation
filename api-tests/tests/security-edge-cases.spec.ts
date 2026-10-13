import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { UsersClient } from '../src/clients/users.client';
import { AuthClient } from '../src/clients/auth.client';
import { makeUser } from '../src/factories/user.factory';

const baseUrl = process.env.API_BASE_URL ?? 'https://serverest.dev';

describe('API | Segurança e cenários negativos adicionais', () => {
  const users = new UsersClient();
  const auth = new AuthClient();

  it('API-016 | deve rejeitar e-mail já cadastrado', async () => {
    const user = makeUser();
    let userId: string | undefined;

    try {
      const created = await users.create(user);
      expect(created.status).toBe(201);

      userId = created.body._id;

      const duplicated = await users.create(user);

      expect(duplicated.status).toBe(400);
      expect(duplicated.body.message)
        .toBe('Este email já está sendo usado');
    } finally {
      if (userId) {
        const cleanup = await users.delete(userId);
        expect(cleanup.status).toBe(200);
      }
    }
  });

  it('API-017 | deve rejeitar cadastro sem administrador', async () => {
    const { administrador: _removed, ...payload } = makeUser();

    const response = await request(baseUrl)
      .post('/usuarios')
      .send(payload);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('administrador');
  });

  it('API-018 | deve rejeitar token inválido', async () => {
    const response = await auth.getProtectedProducts(
      'Bearer token-invalido-qa'
    );

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/Token de acesso/i);
  });

  it('API-019 | deve rejeitar login sem e-mail', async () => {
    const response = await request(baseUrl)
      .post('/login')
      .send({ password: 'senha-sintetica' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('email');
  });

  it('API-020 | deve rejeitar login sem senha', async () => {
    const response = await request(baseUrl)
      .post('/login')
      .send({ email: 'qa-inexistente@example.com' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('password');
  });

  it('API-021 | deve tratar exclusão de usuário inexistente', async () => {
    const response = await users.delete('0000000000000000');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Nenhum registro excluído');
  });
});
