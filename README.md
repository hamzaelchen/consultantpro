# ConsultantPro 🚀

> Plateforme fullstack de gestion de consultants — React · FastAPI · PostgreSQL

---

## 🗂️ Structure du projet

```
consultantpro/
├── frontend/          # React 18 + Vite
├── backend/           # FastAPI + SQLAlchemy
├── .gitignore
└── README.md
```

---

## ⚙️ Stack technique

| Couche     | Technologie                        |
|------------|------------------------------------|
| Frontend   | React 18, Vite, Axios, React Router |
| Backend    | Python 3.11+, FastAPI, SQLAlchemy  |
| Base de données | PostgreSQL 15               |
| Auth       | JWT (python-jose)                  |
| Validation | Pydantic v2                        |

---

## 🚀 Démarrage rapide

### Prérequis
- Node.js ≥ 18
- Python ≥ 3.11
- PostgreSQL ≥ 15

---

### 1. Frontend

```bash
cd frontend
npm install
cp .env.example .env        # configurer VITE_API_URL
npm run dev                 # http://localhost:5173
```

---

### 2. Backend

```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/macOS
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env        # configurer DATABASE_URL, SECRET_KEY
uvicorn app.main:app --reload --port 8000
```

API disponible sur : `http://localhost:8000`  
Documentation Swagger : `http://localhost:8000/docs`

---

### 3. Base de données

```sql
CREATE DATABASE consultantpro;
CREATE USER consultantpro_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE consultantpro TO consultantpro_user;
```

Puis lancez les migrations :

```bash
cd backend
alembic upgrade head
```

---

## 🔑 Variables d'environnement

### Backend (`backend/.env`)

```env
DATABASE_URL=postgresql://consultantpro_user:your_password@localhost:5432/consultantpro
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
CORS_ORIGINS=http://localhost:5173
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:8000/api/v1
```

---

## 🧪 Tests

```bash
# Backend
cd backend && pytest

# Frontend
cd frontend && npm run test
```

---

## 📄 Licence

MIT — voir [LICENSE](LICENSE)
