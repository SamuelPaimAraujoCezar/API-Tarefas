const db = require("../database/database");
const AppError = require("../utils/AppError");

function listarTarefas() {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM tarefas
      ORDER BY created_at DESC
    `;

    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function buscarTarefa(id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tarefas WHERE id = ?";

    db.get(sql, [id], (err, row) => {
      if (err) {
        return reject(err);
      }

      if (!row) {
        return reject(new AppError(`Tarefa com id ${id} não encontrada`, 404));
      }

      resolve(row);
    });
  });
}

function criarTarefa(nome) {
  return new Promise((resolve, reject) => {
    const agora = new Date().toISOString();

    const sql = `
      INSERT INTO tarefas (nome, created_at, updated_at)
      VALUES (?, ?, ?)
    `;

    db.run(sql, [nome, agora, agora], function (err) {
      if (err) return reject(err);

      resolve({
        id: this.lastID,
        nome,
        created_at: agora,
        updated_at: agora,
      });
    });
  });
}

function atualizarTarefa(id, nome) {
  return new Promise((resolve, reject) => {
    const agora = new Date().toISOString();

    const sql = `
      UPDATE tarefas
      SET nome = ?, updated_at = ?
      WHERE id = ?
    `;

    db.run(sql, [nome, agora, id], function (err) {
      if (err) return reject(err);

      if (this.changes === 0) {
        return reject(new AppError(`Tarefa com id ${id} não encontrada`, 404));
      }

      resolve({
        id,
        nome,
        updated_at: agora,
      });
    });
  });
}

function deletarTarefa(id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM tarefas WHERE id = ?";

    db.run(sql, [id], function (err) {
      if (err) {
        return reject(err);
      }

      if (this.changes === 0) {
        return reject(new AppError(`Tarefa com id ${id} não encontrada`, 404));
      }

      resolve();
    });
  });
}

module.exports = {
  listarTarefas,
  buscarTarefa,
  criarTarefa,
  atualizarTarefa,
  deletarTarefa,
};
