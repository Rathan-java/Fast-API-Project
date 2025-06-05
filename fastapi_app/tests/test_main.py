import pytest
from fastapi.testclient import TestClient
from fastapi_app.main import app, users

client = TestClient(app)

@pytest.fixture(autouse=True)
def clear_users():
    users.clear()
    yield
    users.clear()

def test_create_user():
    res = client.post('/users', json={'id': 1, 'name': 'Alice', 'email': 'alice@example.com'})
    assert res.status_code == 201
    assert res.json()['name'] == 'Alice'


def test_get_user_not_found():
    res = client.get('/users/999')
    assert res.status_code == 404


def test_update_and_delete():
    client.post('/users', json={'id': 2, 'name': 'Bob', 'email': 'bob@example.com'})
    res = client.put('/users/2', json={'id': 2, 'name': 'Bobby', 'email': 'bobby@example.com'})
    assert res.status_code == 200
    res = client.delete('/users/2')
    assert res.status_code == 200
    assert client.get('/users/2').status_code == 404
