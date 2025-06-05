const { test, expect, request } = require('@playwright/test');

test.describe.serial('User CRUD API Tests', () => {
  let apiContext;
  let userId;
  let missingId;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: process.env.BASE_URL || 'http://localhost:8000',
    });
    userId = Date.now();
    missingId = userId + 9999;
  });

  test('Create user', async () => {
    const res = await apiContext.post('/users', {
      data: {
        id: userId,
        name: 'Rathan',
        email: 'rathan@example.com',
      },
    });
    expect(res.status()).toBe(201);
    expect(res.headers()['content-type']).toContain('application/json');
    const body = await res.json();
    expect(body.id).toBe(userId);
  });

  test('List users includes created user', async () => {
    const res = await apiContext.get('/users');
    expect(res.status()).toBe(200);
    const users = await res.json();
    const ids = users.map(u => u.id);
    expect(ids).toContain(userId);
  });

  test('Create duplicate user - Negative case', async () => {
    const res = await apiContext.post('/users', {
      data: {
        id: userId,
        name: 'Another',
        email: 'another@example.com',
      },
    });
    expect(res.status()).toBe(400);
  });

  test('Get user', async () => {
    const res = await apiContext.get(`/users/${userId}`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.name).toBe('Rathan');
  });

  test('Update user', async () => {
    const res = await apiContext.put(`/users/${userId}`, {
      data: {
        id: userId,
        name: 'Mira',
        email: 'mira@example.com',
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.name).toBe('Mira');
  });

  test('Update non-existent user - Negative case', async () => {
    const res = await apiContext.put(`/users/${missingId}`, {
      data: { id: missingId, name: 'ghost', email: 'ghost@example.com' },
    });
    expect(res.status()).toBe(404);
  });

  test('Delete user', async () => {
    const res = await apiContext.delete(`/users/${userId}`);
    expect(res.status()).toBe(200);
  });

  test('Get deleted user - Negative case', async () => {
    const res = await apiContext.get(`/users/${userId}`);
    expect(res.status()).toBe(404);
  });

  test('Create user without name - Negative case', async () => {
    const res = await apiContext.post('/users', {
      data: { id: userId, email: 'bad@example.com' },
    });
    expect(res.status()).toBe(422);
  });
});
