import ExecutionStrategy from "./ExecutionStrategy.js";

export default class AgileStrategy extends ExecutionStrategy {
  execute(taskName) {
    console.log(`Задача "${taskName}" выполняется по Agile`);
  }
}


