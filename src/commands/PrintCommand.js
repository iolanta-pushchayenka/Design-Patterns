import Command from './Command.js';

export default class PrintCommand extends Command {
  constructor(document) {
    super();
    this.document = document;
  }

  execute() {
    console.log(`Printing document: ${this.document.getInfo()}`);
  }

  undo() {
    console.log('Undo print operation');
  }
}


