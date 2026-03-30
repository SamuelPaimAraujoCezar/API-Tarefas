const {
  registerSchema,
} = require("../../../../src/validations/authValidation");

describe("Register Schema", () => {
  it("should validate a valid input", () => {
    const result = registerSchema.safeParse({
      name: "Macedo",
      email: "macedo@email.com",
      password: "123456",
    });

    expect(result.success).toBe(true);
  });

  it("should fail when name is too short", () => {
    const result = registerSchema.safeParse({
      name: "Ma",
      email: "macedo@email.com",
      password: "123456",
    });

    expect(result.success).toBe(false);
  });

  it("should fail with invalid email", () => {
    const result = registerSchema.safeParse({
      name: "Macedo",
      email: "email-invalido",
      password: "123456",
    });

    expect(result.success).toBe(false);
  });

  it("should fail when password is too short", () => {
    const result = registerSchema.safeParse({
      name: "Macedo",
      email: "macedo@email.com",
      password: "123",
    });

    expect(result.success).toBe(false);
  });

  it("should fail when body is empty", () => {
    const result = registerSchema.safeParse({});

    expect(result.success).toBe(false);
  });
});
