# 📝 Examination System

A full-stack exam management platform built with the MERN stack and Redis.

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (or a MongoDB Atlas account)
- [Cloudinary](https://cloudinary.com/) account
- [Upstash Redis](https://upstash.com/) account

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/UsamaA7med/Edulens.git
cd exam-system
```

### 2. Install server dependencies

```bash
cd server
npm install
```

### 3. Install client dependencies

```bash
cd ../client
npm install
```

---

## 🔐 Environment Variables

### `server/.env`

```env
PORT_NUMBER = "3000"
MONGODB_URI = mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET = your_jwt_secret_here
CLOUDINARY_CLOUD_NAME = your_cloud_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret
VITE_FRONTEND_URL = http://localhost:5173
UPSTASH_REDIS_REST_URL = https://your-upstash-url.upstash.io
UPSTASH_REDIS_REST_TOKEN = your_upstash_token
```

### `client/.env`

```env
VITE_BACKEND_URL = http://localhost:3000
```

---

## 🚀 Running the App

Open two terminals:

```bash
# Terminal 1 — Backend
cd server
npm run dev
```

```bash
# Terminal 2 — Frontend
cd client
npm run dev
```

The client will be available at `http://localhost:5173` and the server at `http://localhost:3000`.
