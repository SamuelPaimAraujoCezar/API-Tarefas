const request = require("supertest");
const app = require("../../src/app");
const authHeader = require("./authHeader");
const makeTask = require("./factories/task.factory");

async function createTask(token, overrides = {}) {
  const taskData = makeTask(overrides);

  const response = await request(app)
    .post("/api/tasks")
    .set(authHeader(token))
    .send(taskData);

  return response;
}

async function getTasks(token) {
  return request(app).get("/api/tasks").set(authHeader(token));
}

async function getTaskById(token, id) {
  return request(app).get(`/api/tasks/${id}`).set(authHeader(token));
}

async function updateTask(token, id, updates) {
  return request(app)
    .put(`/api/tasks/${id}`)
    .set(authHeader(token))
    .send(updates);
}

async function deleteTask(token, id) {
  return request(app).delete(`/api/tasks/${id}`).set(authHeader(token));
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
