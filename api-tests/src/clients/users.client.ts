import request from 'supertest';

const baseUrl = process.env.API_BASE_URL ?? 'https://serverest.dev';

export interface UserPayload {
  nome: string;
  email: string;
  password: string;
  administrador: 'true' | 'false';
}

export class UsersClient {
  private readonly api = request(baseUrl);

  list() {
    return this.api.get('/usuarios');
  }

  getById(id: string) {
    return this.api.get(`/usuarios/${encodeURIComponent(id)}`);
  }

  create(payload: UserPayload) {
    return this.api.post('/usuarios').send(payload);
  }

  update(id: string, payload: UserPayload) {
    return this.api.put(`/usuarios/${encodeURIComponent(id)}`).send(payload);
  }

  delete(id: string) {
    return this.api.delete(`/usuarios/${encodeURIComponent(id)}`);
  }
}
