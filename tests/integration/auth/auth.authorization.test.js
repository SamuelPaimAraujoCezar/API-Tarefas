const request = require("supertest");
const app = require("../../../src/app");

describe("Authorization - Token obrigatório", () => {
  it("não deve acessar rota protegida sem token", async () => {
    const response = await request(app).get("/api/tasks");

    expect(response.status).toBe(401);
  });

  it("não deve acessar com token inválido", async () => {
    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", "Bearer token_invalido");

    expect(response.status).toBe(401);
  });

  it("deve retornar 401 se header não tiver Bearer", async () => {
    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", "Token invalido");

    expect(response.status).toBe(401);
  });
});
