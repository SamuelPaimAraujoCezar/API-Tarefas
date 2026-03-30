const request = require("supertest");
const app = require("../../../src/app");

describe("POST /api/auth/logout", () => {
  it("should logout successfully", async () => {
    const email = `teste${Date.now()}@email.com`;

    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Teste",
        email,
        password: "123456",
      });

    const refreshToken = registerResponse.body.dados.refreshToken;

    const response = await request(app).post("/api/auth/logout").send({
      refreshToken,
    });

    expect(response.status).toBe(204);
  });

  it("should invalidate refresh token after logout", async () => {
    const email = `teste${Date.now()}@email.com`;

    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Teste",
        email,
        password: "123456",
      });

    const refreshToken = registerResponse.body.dados.refreshToken;

    await request(app).post("/api/auth/logout").send({ refreshToken });

    const response = await request(app)
      .post("/api/auth/refresh")
      .send({ refreshToken });

    expect(response.status).toBe(401);
  });

  it("should return 400 when refreshToken is missing", async () => {
    const response = await request(app).post("/api/auth/logout").send({});

    expect(response.status).toBe(400);
  });
});
