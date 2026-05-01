# 🚀 Node.js Monorepo Starter (Express + TypeScript)

A minimal **backend starter template** using:

- Express
- TypeScript
- pnpm workspace (monorepo)
- Modular routing with API versioning

---

## 📦 Features

- 🧱 Clean folder structure
- 🔀 Versioned API (`/api/v1`)
- ⚡ Fast dev with `tsx`
- 🔧 Path alias support (`@src/*`)
- 📁 Ready for scaling (service / repo layer)

---

## 📁 Project Structure

```
.
├─ apps/
│  └─ api/
│     ├─ src/
│     │  ├─ routes/
│     │  │  ├─ index.ts
│     │  │  └─ v1/
│     │  │     ├─ index.ts
│     │  │     └─ health.ts
│     │  ├─ server.ts
│     │  └─ ...
│     ├─ tsconfig.json
│     └─ package.json
├─ package.json
├─ pnpm-workspace.yaml
└─ README.md
```

---

## 🚀 Getting Started

### Install dependencies

```
pnpm install
```

---

### Start development server

```
pnpm --filter api dev
```

---

### Test API

```
curl http://localhost:3001/api/v1/health
```

---

## ⚙️ Available Scripts (API)

```json
{
  "dev": "tsx watch src/server.ts",
  "build": "tsc && tsc-alias",
  "start": "node dist/server.js"
}
```

---

## 🌐 API Structure

```
/api → /v1 → /health
```

Example:

```
GET /api/v1/health
```

---

## 🔧 Environment Variables

Create `.env` inside `apps/api`:

```env
PORT=3001
```

---

## 🛠 Path Alias

```ts
import routes from "@src/routes";
```

Configured in `tsconfig.json`:

```json
"paths": {
  "@src/*": ["src/*"]
}
```
