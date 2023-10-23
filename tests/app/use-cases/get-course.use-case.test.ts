import { createServer, Server } from 'http';
import request from 'supertest';

import app from '../../../src/app/index';

describe('GetCourseUseCase', () => {
  let server: Server;
  beforeEach(() => {
    server = createServer(app.callback());
  });

  afterEach(() => {
    server.close();
  });

  const id = 1;
  let name = 'Name 1';
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setFullYear(startDate.getFullYear() + 1);

  test('Get course with valid ID => should be OK', async () => {
    const origin = { id, name, startDate: startDate.toISOString() };
    const created = { id, name, startDate: startDate.toISOString() };

    await request(server).post('/api/courses').send(origin);

    const response = await request(server).get(`/api/courses/${id}`);

    expect(response.body).toEqual(created);
    expect(response.status).toBe(200);
  });

  test('Get course with non-existing ID => should receive 404 error', async () => {
    const response = await request(server).get(`/api/courses/100`);
    expect(response.body).toEqual({
      code: 'COURSE_NOT_FOUND',
      error: 'Course not found',
      status: 404
    });
    expect(response.status).toBe(404);
  });
});
