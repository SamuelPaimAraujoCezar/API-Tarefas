function makeTask(overrides = {}) {
  return {
    title: "Tarefa de teste",
    description: "Descrição padrão",
    completed: false,
    ...overrides,
  };
}

module.exports = makeTask;
