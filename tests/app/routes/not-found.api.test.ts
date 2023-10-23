import { createServer, Server } from 'http';
import request from 'supertest';

import app from '../../../src/app/index';

describe('NotFound API', () => {
  let server: Server;
  beforeEach(() => {
    server = createServer(app.callback());
  });

  afterEach(() => {
    server.close();
  });

  test('Calling Not-existing API => should receive 404 error', async () => {
    const response = await request(server).get('/abc');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      code: 'RESOURCE_NOT_FOUND',
      error: 'Resource not found',
      status: 404
    });
  });
});
