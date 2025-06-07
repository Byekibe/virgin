# 🧰 Fullstack React + Flask Template

A modern fullstack boilerplate using **React (TypeScript)** for the frontend and **Flask (Python)** for the backend. Designed for rapid development, clean architecture, and easy deployment.

---

## 🗂️ Project Structure

```
project-root/
├── client/         # React frontend (TypeScript, Vite)
├── backend/        # Flask backend (Python, REST API)
├── .env.example    # Shared environment example (if applicable)
└── README.md
```

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (v18+ recommended)
- Python 3.10+
- `virtualenv` or `venv`
- `npm` or `yarn`
- `pip` (or pipx)

---

### 📦 Frontend Setup

```bash
cd client
npm install
npm run dev
```

> Runs the React app in development mode. By default, it should be available at `http://localhost:5173/`.

---

### 🔙 Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Set up environment variables by copying the example:

```bash
cp .env.example .env
```

Then run the backend:

```bash
flask run
```

> By default, Flask will run on `http://localhost:5000/`.

---

## 🔐 Environment Variables

Create a `.env` file in `/backend` based on `.env.example`. Include keys such as:

```env
FLASK_APP=app.py
FLASK_ENV=development
DATABASE_URL=sqlite:///dev.db
SECRET_KEY=your-secret-key
```

(If the client needs environment variables, you can add a `.env` in `/client` as well.)

---

## 🔄 API & Proxy

To avoid CORS issues during development:

- The frontend (Vite) can proxy requests to Flask.
- Edit `/client/vite.config.ts` to include:

```ts
server: {
  proxy: {
    '/api': 'http://localhost:5000'
  }
}
```

Then prefix your fetch requests with `/api`.

---

## 🧪 Testing

(Include this section if you have tests. Otherwise, remove.)

```bash
# Example for backend tests
pytest
```

---

## 🏗️ Building for Production

Frontend:

```bash
cd client
npm run build
```

Backend:

- Serve `client/dist/` via Flask using `send_from_directory`, or deploy separately (e.g., Vercel for frontend, Heroku for backend).

---

## 🧠 Tips

- Keep `/migrations/` if using Flask-Migrate. Run `flask db upgrade` to apply schema.
- Use `.flaskenv` for local dev variables (optional).
- Create reusable services for both client and backend to keep logic clean.

---

## 📜 License

MIT — feel free to use, modify, or extend.

---

## 🙌 Contributions

PRs and issues welcome! This is a base template — improve it as needed for your workflow.
