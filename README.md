# 🚀 API de Tarefas (Node.js + MongoDB)

Uma API RESTful completa para gerenciamento de tarefas, com autenticação baseada em JWT, refresh token com rotação, validação de dados e arquitetura em camadas.

---

## 📌 Funcionalidades

### 🔐 Autenticação

- Registro de usuário
- Login com geração de tokens
- Refresh token com rotação
- Logout com invalidação de sessão
- Autenticação via Bearer Token

### 📋 Tarefas

- Criar tarefa
- Listar tarefas (com paginação, filtros e ordenação)
- Buscar tarefa por ID
- Atualizar tarefa
- Deletar tarefa
- Tarefas vinculadas ao usuário autenticado

### 🛡️ Segurança

- Senhas criptografadas com bcrypt
- JWT com expiração
- Refresh tokens armazenados no banco
- Rotação de refresh token
- Logout real (revogação de sessão)
- Validação de dados com Zod

---

### 📌 Camadas

- **Routes** → define endpoints
- **Middlewares** → validação, autenticação
- **Controllers** → entrada/saída HTTP
- **Services** → regras de negócio
- **Repositories** → acesso ao banco
- **Models** → schemas do MongoDB

---

## ⚙️ Tecnologias

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Zod
- dotenv

---

## 🔧 Instalação

```bash
git clone https://github.com/SamuelPaimAraujoCezar/API-Tarefas.git
cd pasta-do-projeto
npm install
```

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```
PORT=3000
MONGO_URI=sua_string_do_mongodb
JWT_SECRET=seu_secret
JWT_REFRESH_SECRET=seu_refresh_secret
NODE_ENV=development
```

---

## ▶️ Rodando o projeto

```bash
npm run dev
```

---

## 🔐 Autenticação

### 📌 Headers protegidos

```
Authorization: Bearer SEU_ACCESS_TOKEN
```

---

## 📡 Endpoints

### 🔐 Auth

#### Register

```
POST /api/auth/register
```

#### Login

```
POST /api/auth/login
```

#### Refresh Token

```
POST /api/auth/refresh
```

#### Logout

```
POST /api/auth/logout
```

---

### 📋 Tasks

#### Criar tarefa

```
POST /api/tasks
```

#### Listar tarefas

```
GET /api/tasks?page=1&limit=10
```

#### Buscar por ID

```
GET /api/tasks/:id
```

#### Atualizar

```
PUT /api/tasks/:id
```

#### Deletar

```
DELETE /api/tasks/:id
```

---

## 🔄 Fluxo de Autenticação

1. Usuário faz login ou register
2. Recebe:
   - accessToken (curta duração)
   - refreshToken (longa duração)

3. Usa accessToken nas requisições
4. Quando expira:
   - chama `/refresh`
   - recebe novo accessToken e refreshToken

5. No logout:
   - refresh token é removido do banco

---

## 🧪 Validação

Validação feita com Zod via middleware:

- body
- params
- query

Erros retornam:

```json
{
  "sucesso": false,
  "erros": [
    {
      "campo": "email",
      "mensagem": "Email inválido"
    }
  ]
}
```

---

## 📊 Paginação, Filtros e Ordenação

### Paginação

```
?page=1&limit=10
```

### Filtros

```
?completed=true
```

### Ordenação

```
?sort=dueDate,-createdAt
```

---

## 🔐 Segurança implementada

- Tokens com expiração
- Refresh token com rotação
- Armazenamento de refresh token no banco
- Logout com invalidação
- Validação de entrada
- Mensagens genéricas no login

---

## 🧠 Boas práticas aplicadas

- Arquitetura em camadas
- Separação de responsabilidades
- Controllers enxutos
- Repositories para acesso ao banco
- Middlewares reutilizáveis
- Validação centralizada
- Tratamento global de erros

---

## 🚀 Melhorias futuras

- Testes automatizados
- Documentação com Swagger
- Deploy em nuvem
- Sistema de permissões (roles)

---

## 📄 Licença

Este projeto está sob a licença MIT.
