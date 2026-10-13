import { describe, expect, it } from 'vitest';
import { UsersClient } from '../src/clients/users.client';
import { makeUser } from '../src/factories/user.factory';
import {
  userSchema,
  usersListSchema
} from '../src/schemas/user.schema';

describe('Users API | Contract Validation', () => {
  const client = new UsersClient();

  it('API-008 | deve respeitar o contrato de listagem', async () => {
    const response = await client.list();

    expect(response.status).toBe(200);

    const result = usersListSchema.safeParse(response.body);

    expect(
      result.success,
      JSON.stringify(result.error?.issues)
    ).toBe(true);

    expect(response.body.quantidade)
      .toBe(response.body.usuarios.length);
  });

  it('API-009 | deve validar o contrato de um usuário criado', async () => {
    const user = makeUser();
    let userId: string | undefined;

    try {
      const created = await client.create(user);

      expect(created.status).toBe(201);
      expect(created.body._id).toEqual(expect.any(String));

      userId = created.body._id;

      const response = await client.getById(userId!);

      expect(response.status).toBe(200);

      const result = userSchema.safeParse(response.body);

      expect(
        result.success,
        JSON.stringify(result.error?.issues)
      ).toBe(true);

      expect(response.body).toMatchObject({
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
