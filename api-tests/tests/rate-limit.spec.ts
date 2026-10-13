import express from 'express';
import rateLimit from 'express-rate-limit';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

describe('API-015 | Rate limiting em ambiente local controlado', () => {
  it('deve bloquear a requisição 101 dentro da janela de 60 segundos', async () => {
    const app = express();

    const limiter = rateLimit({
      windowMs: 60_000,
      limit: 100,
      standardHeaders: 'draft-7',
      legacyHeaders: false
    });

    app.use('/usuarios', limiter);

    app.get('/usuarios', (_req, res) => {
      res.status(200).json({ usuarios: [] });
    });

    for (let i = 0; i < 100; i++) {
      const response = await request(app).get('/usuarios');
      expect(response.status).toBe(200);
    }

    const blocked = await request(app).get('/usuarios');

    expect(blocked.status).toBe(429);
    expect(blocked.headers['retry-after']).toBeDefined();
  });

  it('API-015 | deve liberar novas requisições após a janela', async () => {
    const app = express();

    const limiter = rateLimit({
      windowMs: 1000,
      limit: 2,
      standardHeaders: 'draft-7',
      legacyHeaders: false
    });

    app.use('/usuarios', limiter);

    app.get('/usuarios', (_req, res) => {
      res.status(200).json({ usuarios: [] });
    });

    expect((await request(app).get('/usuarios')).status).toBe(200);
    expect((await request(app).get('/usuarios')).status).toBe(200);
    expect((await request(app).get('/usuarios')).status).toBe(429);

    await new Promise(resolve => setTimeout(resolve, 1200));

    expect((await request(app).get('/usuarios')).status).toBe(200);
  });

});
