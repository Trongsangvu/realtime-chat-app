# 🚀 Realtime Chat App (Yarn 4)

A real-time video & text chat app built with React, TypeScript, Socket.IO and PeerJS.

---

## 🧰 Tech Stack

- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, TypeScript, Socket.IO
- P2P: PeerJS (WebRTC)
- Testing: Cypress

---

## 📦 Requirements

- Node.js >= 18
- Yarn 4 (Berry)

---

## ⚙️ Setup

### 1. Enable Yarn 4

```bash
corepack enable
corepack prepare yarn@stable --activate
yarn -v
```

---

### 2. (Recommended) Disable PnP

To avoid issues with some libraries:

```bash
yarn config set nodeLinker node-modules
```
or
```
Create .yarnrc.yml file with nodeLinker: node-modules
```

---

### 3. Install dependencies

Run in each folder:

```bash
cd client
yarn install

cd ../server
yarn install

cd ../peerjs
yarn install
```

---

## 🔐 Environment Variables

Create `.env` files:

### `server/.env`

```env
PORT=4000
CLIENT_ORIGIN=http://localhost:3000
```

### `peerjs/.env`

```env
PEERJS_PORT=9000
```

---

## ▶️ Run (Development)

Open 3 terminals:

---

### 1. Start server (TypeScript)

```bash
cd server
yarn dev
```

👉 Ensure `package.json` has:

```json
"scripts": {
  "dev": "nodemon src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

---

### 2. Start PeerJS

```bash
cd peerjs
yarn dev
```

---

### 3. Start client

```bash
cd client
yarn start
```

---

## 🌐 Access App

```
http://localhost:3000
```

---

## 🏗️ Production Build

### Server

```bash
cd server
yarn build
yarn start
```

---

### Client

```bash
cd client
yarn build
```

---

## 🧪 Testing (Cypress)

```bash
cd client
yarn cypress:open
```

---

## ⚠️ Common Issues (Yarn 4)

### 1. Cannot find module (axios, etc.)

```bash
yarn add <package>
```

---

### 2. dist/index.js not found

👉 You forgot to build:

```bash
yarn build
```

---

### 3. Sass warning (legacy JS API)

👉 Safe to ignore (CRA limitation)

---

### 4. Path alias not working

👉 Ensure both:

- `jsconfig.json` / `tsconfig.json`
- bundler config (if needed)

---

## 📁 Structure

```
client/   → React app
server/   → Node + Socket.IO
peerjs/   → WebRTC signaling
```

---

## 🚀 Future Improvements

- Migrate CRA → Vite (faster build)
- Add authentication
- Improve WebRTC reliability (STUN/TURN)

---

## 📝 Notes

- Yarn 4 uses Plug'n'Play by default → can cause issues
- Using `node-modules` linker is more stable for this stack

---

## 🔗 Demo

https://webrtc-videochat-bice.vercel.app/
