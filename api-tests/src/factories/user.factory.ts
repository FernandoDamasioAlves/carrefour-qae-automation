import { randomUUID } from 'node:crypto';
import type { UserPayload } from '../clients/users.client';

export function makeUser(
  overrides: Partial<UserPayload> = {}
): UserPayload {
  const id = randomUUID();

  return {
    nome: `QA Carrefour ${id.slice(0, 8)}`,
    email: `qa-${id}@example.com`,
    password: `Test-${id}`,
    administrador: 'false',
    ...overrides
  };
}
