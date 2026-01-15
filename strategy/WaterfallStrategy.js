import ExecutionStrategy from "./ExecutionStrategy.js";

export default class WaterfallStrategy extends ExecutionStrategy {
  execute(taskName) {
    console.log(`Задача "${taskName}" выполняется по Waterfall`);
  }
}


