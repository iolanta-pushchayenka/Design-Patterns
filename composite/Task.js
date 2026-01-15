import TaskComponent from "./TaskComponent.js";

export default class Task extends TaskComponent {
  execute() {
    this.strategy.execute(this.name);
  }
}

