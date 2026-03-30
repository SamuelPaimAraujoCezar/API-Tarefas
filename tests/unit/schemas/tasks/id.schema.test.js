const { idSchema } = require("../../../../src/validations/taskValidation");

describe("ID Schema", () => {
  it("should pass with valid ObjectId", () => {
    const result = idSchema.safeParse({
      id: "507f1f77bcf86cd799439011",
    });

    expect(result.success).toBe(true);
  });

  it("should fail with invalid ObjectId", () => {
    const result = idSchema.safeParse({
      id: "123",
    });

    expect(result.success).toBe(false);
  });

  it("should fail when id is missing", () => {
    const result = idSchema.safeParse({});

    expect(result.success).toBe(false);
  });
});
