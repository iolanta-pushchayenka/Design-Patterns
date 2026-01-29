import Command from './Command.js';

export default class SaveCommand extends Command {
  constructor(document) {
    super();
    this.document = document;
  }

  execute() {
    console.log(`Saving document: ${this.document.getInfo()}`);
  }

  undo() {
    console.log('Undo save operation');
  }
}

