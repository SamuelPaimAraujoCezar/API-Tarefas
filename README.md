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

## 🔑 Controle de Acesso (Roles)

A API implementa um sistema de autorização baseado em **roles + ownership**:

### Roles disponíveis:

- `USER`
- `ADMIN`

### Regras:

#### 👤 USER

- Pode acessar apenas suas próprias tarefas
- Pode criar, listar, atualizar e deletar **somente tarefas que criou**

#### 👑 ADMIN

- Pode acessar **todas as tarefas**
- Pode realizar qualquer operação (CRUD) em qualquer tarefa

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

Lista tarefas (USER: apenas suas | ADMIN: todas)

#### GET `/api/tasks/:id`

Busca tarefa por ID (USER: apenas suas | ADMIN: qualquer)

#### POST `/api/tasks`

Cria nova tarefa

#### PUT `/api/tasks/:id`

Atualiza tarefa (USER: apenas suas | ADMIN: qualquer)

#### DELETE `/api/tasks/:id`

Remove tarefa (USER: apenas suas | ADMIN: qualquer)

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

O projeto possui testes de integração (E2E) cobrindo:

- Autenticação
- Refresh token (rotação e invalidação)
- Autorização baseada em roles (USER vs ADMIN)
- Middleware de autenticação (JWT)
- CRUD de tarefas

### 🧪 Cenários de autorização testados

#### USER

- ✔️ Acessa próprias tarefas
- ❌ Não acessa tarefas de outros usuários

#### ADMIN

- ✔️ Acessa tarefas de qualquer usuário
- ✔️ Atualiza tarefas de qualquer usuário
- ✔️ Remove tarefas de qualquer usuário
- ✔️ Lista todas as tarefas

---

### ▶️ Rodar testes

```bash
npm test
```

---

## 🛡️ Segurança

- Senhas com hash (bcrypt)
- Autenticação via JWT
- Controle de acesso por roles (RBAC)
- Proteção por ownership (multi-tenant)
- Validação de dados com Zod
- Tokens expirados tratados
- Refresh token com rotação e persistência

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
- Testes E2E cobrindo fluxo completo
- Isolamento de regras de autorização
- Tratamento global de erros
- Refresh token com rotação segura

---

## 🚀 Próximos passos (melhorias)

- Documentação com Swagger
- Deploy em nuvem

---

## 📄 Licença

Este projeto está sob a licença MIT.
