import TaskComponent from "./TaskComponent.js";

export default class TaskGroup extends TaskComponent {
  constructor(name) {
    super(name);
    this.children = [];
  }

  add(task) {
    this.children.push(task);
  }

  execute() {
    console.log(`Начало выполнения группы задач: ${this.name}`);
    this.children.forEach(task => task.execute());
  }
}

