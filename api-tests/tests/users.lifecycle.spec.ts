import { describe, expect, it } from 'vitest';
import { UsersClient } from '../src/clients/users.client';
import { makeUser } from '../src/factories/user.factory';

describe('Users API | Lifecycle', () => {
  const client = new UsersClient();

  it('API-006 | deve atualizar um usuário existente', async () => {
    const original = makeUser();
    let userId: string | undefined;

    try {
      const created = await client.create(original);

      expect(created.status).toBe(201);
      expect(created.body._id).toEqual(expect.any(String));

      userId = created.body._id;

      const updatedData = {
        ...original,
        nome: 'Usuario Atualizado QA Carrefour'
      };

      const updated = await client.update(userId!, updatedData);

      expect(updated.status).toBe(200);
      expect(updated.body.message).toBe('Registro alterado com sucesso');

      const retrieved = await client.getById(userId!);

      expect(retrieved.status).toBe(200);
      expect(retrieved.body.nome).toBe(updatedData.nome);
      expect(retrieved.body.email).toBe(original.email);
    } finally {
      if (userId) {
        const cleanup = await client.delete(userId);
        expect(cleanup.status).toBe(200);
      }
    }
  });

  it('API-007 | deve excluir um usuário existente', async () => {
    const user = makeUser();
    const created = await client.create(user);

    expect(created.status).toBe(201);
    expect(created.body._id).toEqual(expect.any(String));

    const userId: string = created.body._id;

    const deleted = await client.delete(userId);

    expect(deleted.status).toBe(200);
    expect(deleted.body.message).toBe('Registro excluído com sucesso');

    const retrieved = await client.getById(userId);

    expect(retrieved.status).toBe(400);
    expect(retrieved.body.message).toBe('Usuário não encontrado');
  });
});
