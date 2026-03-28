# 🚀 API de Gerenciamento de Tarefas

API RESTful desenvolvida com Node.js para gerenciamento de tarefas com autenticação de usuários, controle de acesso e funcionalidades avançadas como paginação, filtros e ordenação.

---

## 📌 Funcionalidades

- 🔐 Autenticação com JWT
- 👤 Cadastro e login de usuários
- 📝 CRUD completo de tarefas
- 🔒 Cada usuário acessa apenas suas próprias tarefas
- 📊 Paginação de resultados
- 🔍 Filtros por status e título
- ↕️ Ordenação dinâmica
- ✅ Validação de dados
- ⚠️ Tratamento global de erros

---

## 🛠️ Tecnologias utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Zod
- dotenv

---

## ⚙️ Configuração do ambiente

### 1. Clone o projeto

```
git clone https://github.com/SamuelPaimAraujoCezar/API-Tarefas.git
```

### 2. Instale as dependências

```
npm install
```

### 3. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto:

```
PORT=3000
MONGO_URI=sua_string_do_mongodb
NODE_ENV=development
JWT_SECRET=seu_segredo_super_secreto
```

---

## ▶️ Como executar o projeto

```
npm run dev
```

---

## 🔐 Autenticação

A API utiliza autenticação via JWT.

### Header obrigatório:

```
Authorization: Bearer SEU_TOKEN
```

---

## 📌 Endpoints

### 🔹 Autenticação

#### Cadastro

```
POST /api/auth/register
```

**Body:**

```json
{
  "name": "João",
  "email": "joao@email.com",
  "password": "123456"
}
```

---

#### Login

```
POST /api/auth/login
```

**Body:**

```json
{
  "email": "joao@email.com",
  "password": "123456"
}
```

---

### 🔹 Tarefas

> 🔒 Todas as rotas abaixo requerem autenticação

---

#### Criar tarefa

```
POST /api/tasks
```

**Body:**

```json
{
  "title": "Estudar Node.js",
  "description": "Aprender backend",
  "dueDate": "2026-03-30"
}
```

---

#### Listar tarefas

```
GET /api/tasks
```

### Query params:

- `page` (default: 1)
- `limit` (default: 10)
- `completed` (true | false)
- `title` (busca por texto)
- `sort` (dueDate | createdAt | title)
- `order` (asc | desc)

**Exemplo:**

```
GET /api/tasks?page=1&limit=5&completed=true&sort=createdAt&order=desc
```

---

#### Buscar tarefa por ID

```
GET /api/tasks/:id
```

---

#### Atualizar tarefa

```
PUT /api/tasks/:id
```

---

#### Deletar tarefa

```
DELETE /api/tasks/:id
```

**Resposta:**

```
204 No Content
```

---

## ⚠️ Tratamento de erros

A API retorna erros no seguinte formato:

```json
{
  "sucesso": false,
  "erro": "Mensagem de erro"
}
```

Ou para validações:

```json
{
  "sucesso": false,
  "erros": [
    {
      "campo": "title",
      "mensagem": "Campo obrigatório"
    }
  ]
}
```

---

## 🔒 Segurança

- Senhas criptografadas com bcrypt
- Autenticação via JWT
- Proteção de rotas com middleware
- Isolamento de dados por usuário

---

## 🚀 Melhorias futuras

- Refresh Token
- Testes automatizados
- Documentação com Swagger
- Deploy em nuvem
- Sistema de permissões (roles)

---

## 📄 Licença

Este projeto está sob a licença MIT.
