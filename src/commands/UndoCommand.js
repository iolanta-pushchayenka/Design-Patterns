import Command from'./Command.js';

export default class UndoCommand extends Command {
  constructor(commandManager) {
    super();
    this.commandManager = commandManager;
  }

  execute() {
    this.commandManager.undoLastCommand();
  }

  undo() {
    console.log('Undo of undo is not supported');
  }
}


