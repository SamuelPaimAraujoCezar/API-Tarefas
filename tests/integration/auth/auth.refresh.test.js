const request = require("supertest");
const app = require("../../../src/app");

describe("POST /api/auth/refresh", () => {
  it("should refresh tokens successfully", async () => {
    const email = `teste${Date.now()}@email.com`;
    const password = "123456";

    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Teste",
        email,
        password,
      });

    const oldRefreshToken = registerResponse.body.dados.refreshToken;

    const response = await request(app).post("/api/auth/refresh").send({
      refreshToken: oldRefreshToken,
    });

    expect(response.status).toBe(200);

    const data = response.body.dados;

    expect(data.accessToken).toBeDefined();
    expect(data.refreshToken).toBeDefined();

    expect(data.refreshToken).not.toBe(oldRefreshToken);
  });

  it("should return 401 with invalid refresh token", async () => {
    const response = await request(app).post("/api/auth/refresh").send({
      refreshToken: "token-invalido",
    });

    expect(response.status).toBe(401);
  });

  it("should return 401 with reused refresh token", async () => {
    const email = `teste${Date.now()}@email.com`;

    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Teste",
        email,
        password: "123456",
      });

    const refreshToken = registerResponse.body.dados.refreshToken;

    await request(app).post("/api/auth/refresh").send({ refreshToken });

    const response = await request(app)
      .post("/api/auth/refresh")
      .send({ refreshToken });

    expect(response.status).toBe(401);
  });

  it("should return 400 when body is empty", async () => {
    const response = await request(app).post("/api/auth/refresh").send({});

    expect(response.status).toBe(400);
  });
});
