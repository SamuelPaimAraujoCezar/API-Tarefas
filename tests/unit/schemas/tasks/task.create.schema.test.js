const {
  createTaskSchema,
} = require("../../../../src/validations/taskValidation");

describe("Create Task Schema", () => {
  it("should fail when body is empty", () => {
    const result = createTaskSchema.safeParse({});

    expect(result.success).toBe(false);
  });

  it("should fail when title is missing", () => {
    const result = createTaskSchema.safeParse({
      description: "Sem título",
    });

    expect(result.success).toBe(false);
  });

  it("should fail when title is empty", () => {
    const result = createTaskSchema.safeParse({
      title: "",
    });

    expect(result.success).toBe(false);
  });

  it("should pass without optional fields", () => {
    const result = createTaskSchema.safeParse({
      title: "Só título",
    });

    expect(result.success).toBe(true);
  });

  it("should accept valid completed", () => {
    const result = createTaskSchema.safeParse({
      title: "Teste",
      completed: true,
    });

    expect(result.success).toBe(true);
  });

  it("should fail when completed is not boolean", () => {
    const result = createTaskSchema.safeParse({
      title: "Teste",
      completed: "true",
    });

    expect(result.success).toBe(false);
  });

  it("should accept valid dueDate", () => {
    const result = createTaskSchema.safeParse({
      title: "Teste",
      dueDate: new Date().toISOString(),
    });

    expect(result.success).toBe(true);
  });

  it("should fail with invalid dueDate", () => {
    const result = createTaskSchema.safeParse({
      title: "Teste",
      dueDate: "data inválida",
    });

    expect(result.success).toBe(false);
  });
});
