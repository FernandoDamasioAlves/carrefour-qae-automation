import { describe, expect, it } from 'vitest';
import { UsersClient } from '../src/clients/users.client';
import { makeUser } from '../src/factories/user.factory';

describe('Users API | Validações', () => {
  const client = new UsersClient();

  it('API-003 | deve rejeitar cadastro sem nome', async () => {
    const { nome: _nome, ...invalidUser } = makeUser();

    const response = await client.create(
      invalidUser as ReturnType<typeof makeUser>
    );

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('nome');
  });

  it('API-004 | deve rejeitar cadastro com e-mail inválido', async () => {
    const response = await client.create(
      makeUser({ email: 'email-invalido' })
    );

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('email');
  });

  it('API-005 | deve retornar erro para usuário inexistente', async () => {
    const response = await client.getById(
      '0000000000000000'
    );

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});
