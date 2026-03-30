const request = require("supertest");
const app = require("../../../src/app");

describe("POST /api/auth/login", () => {
  it("should login successfully", async () => {
    const email = `teste${Date.now()}@email.com`;
    const password = "123456";

    await request(app).post("/api/auth/register").send({
      name: "Teste",
      email,
      password,
    });

    const response = await request(app).post("/api/auth/login").send({
      email,
      password,
    });

    expect(response.status).toBe(200);

    const data = response.body.dados;

    expect(data.user).toBeDefined();
    expect(data.accessToken).toBeDefined();
    expect(data.refreshToken).toBeDefined();
  });

  it("should return 401 with invalid password", async () => {
    const email = `teste${Date.now()}@email.com`;

    await request(app).post("/api/auth/register").send({
      name: "Teste",
      email,
      password: "123456",
    });

    const response = await request(app).post("/api/auth/login").send({
      email,
      password: "senha-errada",
    });

    expect(response.status).toBe(401);
  });

  it("should return 401 when user does not exist", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "naoexiste@email.com",
      password: "123456",
    });

    expect(response.status).toBe(401);
  });

  it("should return 400 with invalid email format", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "email-invalido",
      password: "123456",
    });

    expect(response.status).toBe(400);
  });

  it("should return 400 when body is empty", async () => {
    const response = await request(app).post("/api/auth/login").send({});

    expect(response.status).toBe(400);
  });
});
