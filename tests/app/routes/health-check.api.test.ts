import { createServer, Server } from 'http';
import request from 'supertest';

import app from '../../../src/app/index';

describe('HealthCheck API', () => {
  let server: Server;
  beforeEach(() => {
    server = createServer(app.callback());
  });

  afterEach(() => {
    server.close();
  });

  test('Calling HealthCheck API => should be OK', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      code: 'SYSTEM_READY',
      status: 200
    });
  });
});
