# 📌 API de Tarefas

API RESTful para gerenciamento de tarefas com autenticação JWT, controle de acesso por usuário e testes automatizados.

---

## 🚀 Tecnologias utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- JWT (JSON Web Token)
- Zod (validação)
- Jest + Supertest (testes)
- bcryptjs (hash de senha)

---

## 🔐 Autenticação

A API utiliza **JWT** para autenticação.

### Fluxo:

1. Registro → gera tokens
2. Login → gera tokens
3. Enviar token no header:

```http
Authorization: Bearer <accessToken>
```

---

## 📌 Endpoints

### 🔑 Auth

#### POST `/api/auth/register`

Cria um novo usuário.

#### POST `/api/auth/login`

Realiza login.

#### POST `/api/auth/refresh`

Gera novo access token.

#### POST `/api/auth/logout`

Invalida refresh token.

---

### ✅ Tasks (protegidos por autenticação)

#### GET `/api/tasks`

Lista tarefas do usuário autenticado (com paginação e filtros)

#### GET `/api/tasks/:id`

Busca tarefa por ID (apenas do próprio usuário)

#### POST `/api/tasks`

Cria nova tarefa

#### PUT `/api/tasks/:id`

Atualiza tarefa

#### DELETE `/api/tasks/:id`

Remove tarefa

---

## 🔍 Filtros e Query Params

Exemplo:

```bash
GET /api/tasks?page=1&limit=10&completed=true&title=estudo&sort=dueDate&order=asc
```

| Parâmetro | Descrição                 |
| --------- | ------------------------- |
| page      | Página                    |
| limit     | Quantidade por página     |
| completed | true / false              |
| title     | Busca por título          |
| sort      | dueDate, createdAt, title |
| order     | asc / desc                |

---

## 🧪 Testes automatizados

O projeto possui testes de integração cobrindo:

- Autenticação
- Autorização (User A vs User B)
- Segurança (injeção de userId)
- Middleware (auth)
- CRUD de tarefas

### ▶️ Rodar testes

```bash
npm test
```

---

## 🛡️ Segurança

- Senhas com hash (bcrypt)
- Autenticação via JWT
- Proteção por usuário (multi-tenant)
- Validação de dados com Zod
- Tokens expirados tratados
- Refresh token armazenado

---

## ⚙️ Configuração

Crie um arquivo `.env`:

```env
PORT=3000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

---

## 📦 Instalação

```bash
npm install
```

---

## ▶️ Rodar aplicação

```bash
npm run dev
```

---

## 🧹 Boas práticas aplicadas

- Arquitetura em camadas (Controller → Service → Repository)
- Separação de responsabilidades
- Validação centralizada
- Testes isolados com banco limpo
- Uso de factories para testes
- Tratamento global de erros

---

## 🚀 Próximos passos (melhorias)

- Roles e permissões (admin/user)
- Documentação com Swagger
- Deploy em nuvem

---

## 📄 Licença

Este projeto está sob a licença MIT.
