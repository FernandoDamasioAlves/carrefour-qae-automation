import request from 'supertest';

const baseUrl = process.env.API_BASE_URL ?? 'https://serverest.dev';

export class AuthClient {
  private readonly api = request(baseUrl);

  login(email: string, password: string) {
    return this.api.post('/login').send({ email, password });
  }

  getProtectedProducts(token?: string) {
    const req = this.api.post('/produtos').send({});

    return token
      ? req.set('Authorization', token)
      : req;
  }
}
