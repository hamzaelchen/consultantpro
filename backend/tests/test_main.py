def test_root(client):
    r = client.get("/")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"


def test_health(client):
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "healthy"


def test_register_and_login(client):
    # Register
    r = client.post("/api/v1/auth/register", json={
        "email": "test@example.com",
        "full_name": "Test User",
        "password": "secret123",
    })
    assert r.status_code == 201
    assert r.json()["email"] == "test@example.com"

    # Login
    r = client.post("/api/v1/auth/login", data={
        "username": "test@example.com",
        "password": "secret123",
    })
    assert r.status_code == 200
    data = r.json()
    assert "access_token" in data
    return data["access_token"]


def test_me(client):
    # Register + login flow
    client.post("/api/v1/auth/register", json={
        "email": "me@example.com",
        "full_name": "Me User",
        "password": "secret123",
    })
    r = client.post("/api/v1/auth/login", data={
        "username": "me@example.com",
        "password": "secret123",
    })
    token = r.json()["access_token"]

    r = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 200
    assert r.json()["email"] == "me@example.com"


def test_create_consultant(client):
    client.post("/api/v1/auth/register", json={
        "email": "admin@example.com",
        "full_name": "Admin",
        "password": "admin123",
    })
    r = client.post("/api/v1/auth/login", data={
        "username": "admin@example.com",
        "password": "admin123",
    })
    token = r.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    r = client.post("/api/v1/consultants/", json={
        "full_name": "Amira Benali",
        "email": "amira@example.com",
        "role": "Cloud Architect",
        "tjm": 850,
    }, headers=headers)
    assert r.status_code == 201
    assert r.json()["full_name"] == "Amira Benali"
