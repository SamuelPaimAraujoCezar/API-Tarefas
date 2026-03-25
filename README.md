# API de Tarefas

API simples de gerenciamento de tarefas desenvolvida com Node.js e Express.

## 🚀 Funcionalidades

- Listar tarefas
- Buscar tarefa por ID
- Criar tarefa
- Atualizar tarefa
- Deletar tarefa

## 🛠️ Tecnologias

- Node.js
- Express

## 📦 Instalação

```bash
npm install
```

## ▶️ Executar o projeto

```bash
npm run dev
```

ou

```bash
node server.js
```

## 🔗 Rotas principais

### Listar tarefas

GET /api/tarefas

### Buscar tarefa por ID

GET /api/tarefas/:id

### Criar tarefa

POST /api/tarefas

Body:

```json
{
  "nome": "Minha tarefa"
}
```

### Atualizar tarefa

PUT /api/tarefas/:id

### Deletar tarefa

DELETE /api/tarefas/:id

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
```

## 📌 Observações

- Os dados são armazenados em arquivo (`tarefas.json`)
- A API possui validação de dados
- Projeto com fins de estudo
