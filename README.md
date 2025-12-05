#!/usr/bin/env bash
# Script to create a "mini-reddit" scaffold (backend + frontend + docker-compose)
# Place and run in an empty directory. This will create directories `server` and `client`
# and write all files. Then follow the printed instructions to run it.
#
# Usage:
#   chmod +x create-mini-reddit.sh
#   ./create-mini-reddit.sh
#
# Après création des fichiers: copier .env.example en .env et ajuster si besoin, puis:
#   docker-compose up --build
set -euo pipefail

echo "Creating project structure..."

# Root README
cat > README.md <<'EOF'
# Mini-Reddit - Scaffold

Ce projet est un point de départ pour créer une application de type Reddit.

Stack:
- Backend: Node.js + Express + Prisma (Postgres)
- Frontend: React + Vite
- Orchestration: Docker Compose

Commandes rapides:
1. Copier .env.example en .env et définir DATABASE_URL (optionnel si tu utilises docker-compose) et JWT_SECRET
2. docker-compose up --build
3. Backend: http://localhost:4000
4. Frontend: http://localhost:3000

Remarques:
- Prisma est configuré; si tu veux exécuter les migrations localement, utilise `npx prisma migrate dev` depuis server.
- JWT_SECRET doit être défini dans .env (par défaut "change-me" dans docker-compose.yml).
EOF

# .env.example
cat > .env.example <<'EOF'
# Exemple .env
DATABASE_URL="postgresql://reddit:reddit@localhost:5432/reddit?schema=public"
JWT_SECRET="change-me"
EOF

# docker-compose.yml
cat > docker-compose.yml <<'EOF'
version: "3.8"
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: reddit
      POSTGRES_PASSWORD: reddit
      POSTGRES_DB: reddit
    volumes:
      - db_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./server
    depends_on:
      - db
    environment:
      DATABASE_URL: "postgresql://reddit:reddit@db:5432/reddit?schema=public"
      JWT_SECRET: "change-me"
    ports:
      - "4000:4000"
    volumes:
      - ./server:/app
    command: ["node", "src/index.js"]

  frontend:
    build: ./client
    depends_on:
      - backend
    ports:
      - "3000:3000"
    volumes:
      - ./client:/app
    command: ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

volumes:
  db_data:
EOF

# Create server files
mkdir -p server/src server/prisma

cat > server/Dockerfile <<'EOF'
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node", "src/index.js"]
EOF

cat > server/package.json <<'EOF'
{
  "name": "mini-reddit-server",
  "version": "0.1.0",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  },
  "dependencies": {
    "@prisma/client": "^4.0.0",
    "bcrypt": "^5.0.1",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22",
    "prisma": "^4.0.0"
  }
}
EOF

cat > server/prisma/schema.prisma <<'EOF'
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  email     String   @unique
  password  String
  posts     Post[]
  comments  Comment[]
  votes     Vote[]
  createdAt DateTime @default(now())
}

model Subreddit {
  id        Int     @id @default(autoincrement())
  name      String  @unique
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id          Int       @id @default(autoincrement())
  title       String
  content     String?
  author      User      @relation(fields: [authorId], references: [id])
  authorId    Int
  subreddit   Subreddit @relation(fields: [subredditId], references: [id])
  subredditId Int
  comments    Comment[]
  votes       Vote[]
  createdAt   DateTime  @default(now())
}

model Comment {
  id        Int      @id @default(autoincrement())
  content   String
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  post      Post     @relation(fields: [postId], references: [id])
  postId    Int
  createdAt DateTime @default(now())
}

model Vote {
  id       Int   @id @default(autoincrement())
  user     User  @relation(fields: [userId], references: [id])
  userId   Int
  post     Post  @relation(fields: [postId], references: [id])
  postId   Int
  value    Int   // 1 = upvote, -1 = downvote
  @@unique([userId, postId])
}
EOF

cat > server/src/index.js <<'EOF'
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET || 'change-me';

// --- Auth routes (register/login) ---
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: 'username, email and password required' });
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { username, email, password: hashed }
    });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  res.json({ token, user: { id: user.id, username: user.username } });
});

// --- Auth middleware ---
function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing auth' });
  const token = auth.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// --- Posts routes ---
app.get('/api/posts', async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { author: true, subreddit: true, votes: true, comments: true },
    orderBy: { createdAt: 'desc' }
  });
  const formatted = posts.map(p => ({
    id: p.id,
    title: p.title,
    content: p.content,
    author: { id: p.author.id, username: p.author.username },
    subreddit: { id: p.subreddit.id, name: p.subreddit.name },
    score: p.votes.reduce((s, v) => s + v.value, 0),
    commentCount: p.comments.length,
    createdAt: p.createdAt
  }));
  res.json(formatted);
});

app.post('/api/posts', requireAuth, async (req, res) => {
  const { title, content, subreddit } = req.body;
  if (!title || !subreddit) return res.status(400).json({ error: 'title and subreddit required' });

  // find or create subreddit
  let sr = await prisma.subreddit.findUnique({ where: { name: subreddit } });
  if (!sr) {
    sr = await prisma.subreddit.create({ data: { name: subreddit } });
  }
  const post = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { id: req.userId } },
      subreddit: { connect: { id: sr.id } }
    }
  });
  res.json(post);
});

app.post('/api/posts/:id/vote', requireAuth, async (req, res) => {
  const { value } = req.body; // 1 or -1
  const postId = parseInt(req.params.id, 10);
  if (![1, -1].includes(value)) return res.status(400).json({ error: 'value must be 1 or -1' });

  try {
    const existing = await prisma.vote.findUnique({
      where: { userId_postId: { userId: req.userId, postId } }
    });
    if (existing) {
      if (existing.value === value) {
        // remove vote
        await prisma.vote.delete({
          where: { id: existing.id }
        });
      } else {
        await prisma.vote.update({
          where: { id: existing.id },
          data: { value }
        });
      }
    } else {
      await prisma.vote.create({
        data: { userId: req.userId, postId, value }
      });
    }
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Simple health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server running on', PORT));
EOF

# Create client files
mkdir -p client/src

cat > client/Dockerfile <<'EOF'
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
EOF

cat > client/package.json <<'EOF'
{
  "name": "mini-reddit-client",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.4.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
EOF

cat > client/index.html <<'EOF'
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mini-Reddit</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOF

cat > client/src/main.jsx <<'EOF'
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')).render(<App />);
EOF

cat > client/src/App.jsx <<'EOF'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

function App() {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(null);
  const [title, setTitle] = useState('');
  const [subreddit, setSubreddit] = useState('general');

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const res = await axios.get(API + '/posts');
      setPosts(res.data);
    } catch (err) {
      console.error(err);
      alert('Impossible de récupérer les posts');
    }
  }

  async function createPost() {
    if (!token) return alert('Login required (use register/login endpoints)');
    try {
      await axios.post(API + '/posts', {
        title, content: '', subreddit
      }, { headers: { Authorization: 'Bearer ' + token }});
      setTitle('');
      fetchPosts();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la création du post');
    }
  }

  async function vote(postId, value) {
    if (!token) return alert('Login required');
    try {
      await axios.post(API + '/posts/' + postId + '/vote', { value }, {
        headers: { Authorization: 'Bearer ' + token }
      });
      fetchPosts();
    } catch (err) {
      console.error(err);
      alert('Erreur lors du vote');
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>Mini-Reddit</h1>
      <div style={{ marginBottom: 20 }}>
        <input placeholder="Token (paste JWT here)" value={token || ''} onChange={e => setToken(e.target.value)} style={{ width: '60%' }} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <input placeholder="Titre" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Subreddit" value={subreddit} onChange={e => setSubreddit(e.target.value)} />
        <button onClick={createPost}>Poster</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map(p => (
          <li key={p.id} style={{ border: '1px solid #ddd', padding: 10, marginBottom: 10 }}>
            <div style={{ fontWeight: 'bold' }}>{p.title}</div>
            <div>r/{p.subreddit.name} • by {p.author.username}</div>
            <div>Score: {p.score} • Comments: {p.commentCount}</div>
            <div>
              <button onClick={() => vote(p.id, 1)}>▲</button>
              <button onClick={() => vote(p.id, -1)}>▼</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
EOF

# Make script executable
chmod +x create-mini-reddit.sh || true

echo "Files created."
cat <<'EOF'

Prochaines étapes (en français) :
1. Copier .env.example en .env si tu veux exécuter localement sans docker-compose, ou modifier le .env avec les valeurs souhaitées.
   cp .env.example .env

2. Lancer avec Docker Compose (recommandé, va construire images et démarrer la DB, backend et frontend) :
   docker-compose up --build

   - Backend: http://localhost:4000
     Endpoints importants:
       POST /api/register  -> { username, email, password }
       POST /api/login     -> { email, password }  -> renvoie token (JWT)
       GET  /api/posts
       POST /api/posts     -> auth (Bearer token), { title, content, subreddit }
       POST /api/posts/:id/vote -> auth, { value: 1 or -1 }

   - Frontend: http://localhost:3000
     Interface très simple pour lister, poster (nécessite token) et voter (nécessite token).
     Pour obtenir un token : appeler /api/register ou /api/login, copier le token dans le champ "Token" en haut de la page.

3. Si tu veux utiliser Prisma (migrations, introspection), ouvre un shell dans le dossier server et installe les dépendances:
   cd server
   npm install
   npx prisma generate
   # Pour créer la DB locale (si tu n'utilises pas docker-compose) :
   npx prisma migrate dev --name init

Notes et limitations :
- C'est un scaffold minimal pour démarrer rapidement. Beaucoup d'améliorations possibles : pages login/register côté client, stockage sécurisé du token, pagination, filtres, commentaires imbriqués, UI, tests, sécurité, validation des inputs, etc.
- Les fichiers sont écrits en JavaScript et non en TypeScript pour simplicité.
- JWT_SECRET par défaut est "change-me" dans docker-compose.yml. Change-le pour une vraie instance.

Si tu veux, je peux :
- Ajouter les pages de login/register côté client et la gestion automatique du token.
- Convertir en TypeScript.
- Préparer un repo GitHub et pousser le code (tu dois fournir owner/repo).
Dis-moi quelle suite tu veux et je l'ajoute.
EOF
