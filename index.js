import Task from "./composite/Task.js";
import TaskGroup from "./composite/TaskGroup.js";

import AgileStrategy from "./strategy/AgileStrategy.js";
import  WaterfallStrategy from "./strategy/WaterfallStrategy.js";

const agile = new AgileStrategy();
const waterfall = new WaterfallStrategy();

const designTask = new Task("Дизайн", agile);
const testingTask = new Task("Тестирование", waterfall);

const project = new TaskGroup("Проект A");
project.add(designTask);
project.add(testingTask);

project.execute();
