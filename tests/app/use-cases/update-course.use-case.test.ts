import { createServer, Server } from 'http';
import request from 'supertest';

import app from '../../../src/app/index';

describe('UpdateCourseUseCase', () => {
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

  test('Update course name with valid ID and payload => should be OK', async () => {
    const origin = { id, name, startDate: startDate.toISOString() };
    name = 'Name 2';
    const updated = { id, name, startDate: startDate.toISOString() };

    await request(server).post('/api/courses').send(origin);

    const response = await request(server).patch(`/api/courses/${id}`).send({ name });

    expect(response.body).toEqual(updated);
    expect(response.status).toBe(200);
  });

  test('Update course startDate with valid ID and payload => should be OK', async () => {
    startDate.setMonth(startDate.getMonth() + 1);

    const updated = { id, name, startDate: startDate.toISOString() };

    const response = await request(server).patch(`/api/courses/${id}`).send({ startDate: startDate.toISOString() });

    expect(response.body).toEqual(updated);
    expect(response.status).toBe(200);
  });

  test('Update course endDate with valid ID and payload => should be OK', async () => {
    const updated = { id, name, startDate: startDate.toISOString(), endDate: endDate.toISOString() };

    const response = await request(server).patch(`/api/courses/${id}`).send({ endDate: endDate.toISOString() });

    expect(response.body).toEqual(updated);
    expect(response.status).toBe(200);
  });

  test('Update course with invalid ID => should receive 404 error', async () => {
    const response = await request(server).patch(`/api/courses/123c`).send({ endDate: endDate.toISOString() });

    expect(response.body).toEqual({
      code: 'COURSE_NOT_FOUND',
      status: 404,
      error: 'Course not found'
    });
    expect(response.status).toBe(404);
  });

  test('Update course with non-existing ID => should receive 404 error', async () => {
    const response = await request(server).patch(`/api/courses/100`).send({ endDate: endDate.toISOString() });

    expect(response.body).toEqual({
      code: 'COURSE_NOT_FOUND',
      status: 404,
      error: 'Course not found'
    });
    expect(response.status).toBe(404);
  });

  test('Update course without update payload => should receive 400 error', async () => {
    const response = await request(server).patch(`/api/courses/${id}`);

    expect(response.body).toEqual({
      code: 'COURSE_UPDATE_PAYLOAD_EMPTY',
      status: 400,
      error: 'Course update payload is empty'
    });
    expect(response.status).toBe(400);
  });
});
