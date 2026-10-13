import { createServer } from 'node:http';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

describe('API-015 | Rate limiting em ambiente controlado', () => {
  it('deve permitir 100 requisições e bloquear a 101ª', async () => {
    const limit = 100;
    let requests = 0;

    const server = createServer((req, res) => {
      if (req.url !== '/usuarios') {
        res.writeHead(404).end();
        return;
      }

      requests += 1;

      if (requests > limit) {
        res.writeHead(429, {
          'Content-Type': 'application/json',
          'Retry-After': '60'
        });

        res.end(JSON.stringify({
          message: 'Limite de requisições excedido'
        }));
        return;
      }

      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      res.end(JSON.stringify({ usuarios: [] }));
    });

    try {
      for (let i = 0; i < limit; i++) {
        const response = await request(server).get('/usuarios');
        expect(response.status).toBe(200);
      }

      const blocked = await request(server).get('/usuarios');

      expect(blocked.status).toBe(429);
      expect(blocked.headers['retry-after']).toBe('60');
      expect(blocked.body.message)
        .toBe('Limite de requisições excedido');
    } finally {
      server.closeAllConnections();
      server.close();
    }
  });
});
