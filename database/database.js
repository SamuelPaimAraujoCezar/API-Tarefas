const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/tarefas.db", (err) => {
  if (err) {
    console.error("Erro ao conectar no banco", err);
  } else {
    console.log("Conectado ao SQLite");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS tarefas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    created_at TEXT,
    updated_at TEXT
  )
`);

module.exports = db;
