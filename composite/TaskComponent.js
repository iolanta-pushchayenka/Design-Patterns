export default class TaskComponent {
  constructor(name, strategy) {
    this.name = name;
    this.strategy = strategy;
  }

  execute() {
    throw new Error("execute() must be implemented");
  }

  add(task) {
    throw new Error("Cannot add task to this component");
  }
}


