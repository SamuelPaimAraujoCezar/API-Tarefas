const {
  updateTaskSchema,
} = require("../../../../src/validations/taskValidation");

describe("Update Task Schema", () => {
  it("should pass when updating multiple fields", () => {
    const result = updateTaskSchema.safeParse({
      title: "Novo título",
      description: "Nova descrição",
    });

    expect(result.success).toBe(true);
  });

  it("should pass when updating only title", () => {
    const result = updateTaskSchema.safeParse({
      title: "Novo título",
    });

    expect(result.success).toBe(true);
  });

  it("should pass when updating only description", () => {
    const result = updateTaskSchema.safeParse({
      description: "Nova descrição",
    });

    expect(result.success).toBe(true);
  });

  it("should accept valid completed", () => {
    const result = updateTaskSchema.safeParse({
      completed: true,
    });

    expect(result.success).toBe(true);
  });

  it("should fail when completed is not boolean", () => {
    const result = updateTaskSchema.safeParse({
      completed: "true",
    });

    expect(result.success).toBe(false);
  });

  it("should accept valid dueDate", () => {
    const result = updateTaskSchema.safeParse({
      dueDate: new Date().toISOString(),
    });

    expect(result.success).toBe(true);
  });

  it("should fail with invalid dueDate", () => {
    const result = updateTaskSchema.safeParse({
      dueDate: "data inválida",
    });

    expect(result.success).toBe(false);
  });

  it("should fail when no fields are provided", () => {
    const result = updateTaskSchema.safeParse({});

    expect(result.success).toBe(false);
  });
});
