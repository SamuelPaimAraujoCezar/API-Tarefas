# 📝 API de Tarefas

API RESTful para gerenciamento de tarefas, desenvolvida com Node.js, Express e MongoDB, seguindo boas práticas de arquitetura em camadas.

---

## 🚀 Tecnologias utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Dotenv

---

## 🧱 Arquitetura

O projeto segue o padrão em camadas:

- **Controller** → responsável por lidar com requisições e respostas HTTP
- **Service** → contém as regras de negócio
- **Repository** → responsável pelo acesso ao banco de dados
- **Model** → define o schema da aplicação

```
src/
  config/
  controllers/
  database/
  errors/
  middlewares/
  models/
  repositories/
  routes/
  services/
  app.js
  server.js
```

---

## ⚙️ Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
PORT=3000
MONGO_URI=sua_string_do_mongodb
NODE_ENV=development
```

---

## ▶️ Como executar o projeto

```bash
# Clonar o repositório
git clone <url-do-repositorio>

# Acessar a pasta
cd nome-do-projeto

# Instalar dependências
npm install

# Rodar o projeto
npm run dev
```

---

## 📌 Rotas da API

### 🔹 Criar tarefa

**POST** `/api/tasks`

Body:

```json
{
  "title": "Estudar Node.js",
  "description": "Aprender MongoDB",
  "dueDate": "2026-03-30"
}
```

---

### 🔹 Listar tarefas

**GET** `/api/tasks`

---

### 🔹 Buscar tarefa por ID

**GET** `/api/tasks/:id`

---

### 🔹 Atualizar tarefa

**PUT** `/api/tasks/:id`

Body:

```json
{
  "completed": true
}
```

---

### 🔹 Deletar tarefa

**DELETE** `/api/tasks/:id`

---

## 📊 Exemplo de resposta

```json
{
  "sucesso": true,
  "dados": {
    "_id": "123",
    "title": "Estudar Node.js",
    "description": "MongoDB + Mongoose",
    "completed": false,
    "dueDate": "2026-03-30T00:00:00.000Z",
    "createdAt": "2026-03-27T12:00:00.000Z",
    "updatedAt": "2026-03-27T12:00:00.000Z"
  }
}
```

---

## ⚠️ Tratamento de erros

A aplicação utiliza uma classe customizada `AppError` para padronizar erros.

Exemplo:

```json
{
  "sucesso": false,
  "erro": "Tarefa com id 123 não encontrada"
}
```

---

## 🧩 Funcionalidades

- Criar tarefas
- Listar tarefas
- Buscar tarefa por ID
- Atualizar tarefa
- Deletar tarefa
- Ordenação por data
- Tratamento de erros padronizado

---

## 🔐 Boas práticas aplicadas

- Separação de responsabilidades (Controller, Service, Repository)
- Uso de variáveis de ambiente (.env)
- Tratamento centralizado de erros
- Código modular e escalável

---

## 🚧 Próximas melhorias

- Validação de dados com Zod
- Paginação de tarefas
- Filtros (status, data)
- Testes automatizados

---

## 📄 Licença

Este projeto está sob a licença MIT.
