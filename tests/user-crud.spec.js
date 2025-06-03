const { test, expect, request } = require('@playwright/test');

test.describe('User CRUD API Tests', () => {
  let apiContext;
  const userId = 101;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'http://localhost:8000',
    });
  });

  test('Create user', async () => {
    const res = await apiContext.post('/users', {
      data: {
        id: userId,
        name: 'Rathan',
        email: 'rathan@example.com'
      }
    });
    expect(res.status()).toBe(200);
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
        email: 'mira@example.com'
      }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.name).toBe('Mira');
  });

  test('Delete user', async () => {
    const res = await apiContext.delete(`/users/${userId}`);
    expect(res.status()).toBe(200);
  });

  test('Get deleted user - Negative case', async () => {
    const res = await apiContext.get(`/users/${userId}`);
    expect(res.status()).toBe(404);
  });
});
