const { loginSchema } = require("../../../../src/validations/authValidation");

describe("Login Schema", () => {
  it("should validate valid input", () => {
    const result = loginSchema.safeParse({
      email: "macedo@email.com",
      password: "123456",
    });

    expect(result.success).toBe(true);
  });

  it("should fail with invalid email", () => {
    const result = loginSchema.safeParse({
      email: "email-invalido",
      password: "123456",
    });

    expect(result.success).toBe(false);
  });

  it("should fail when password is empty", () => {
    const result = loginSchema.safeParse({
      email: "macedo@email.com",
      password: "",
    });

    expect(result.success).toBe(false);
  });

  it("should fail when body is empty", () => {
    const result = loginSchema.safeParse({});

    expect(result.success).toBe(false);
  });
});
