// export default class CommandManager {
//   constructor() {
//     this.history = [];
//   }

//   executeCommand(command) {
//     command.execute();
//     this.history.push(command);
//   }

//   undoLastCommand() {
//     const command = this.history.pop();
//     if (command) {
//       command.undo();
//     } else {
//       console.log('No commands to undo');
//     }
//   }
// }




class CommandManager {
  constructor() {
    this.history = [];
  }

  executeCommand(command) {
    command.execute();
    this.history.push(command);
    console.log(`-- Command executed: ${command.constructor.name}`);
    this.printHistory();
  }

  undoLastCommand() {
    const command = this.history.pop();
    if (command) {
      command.undo();
      console.log(`-- Command undone: ${command.constructor.name}`);
      this.printHistory();
    } else {
      console.log('No commands to undo');
    }
  }

  printHistory() {
    if (this.history.length === 0) {
      console.log('-- Command history is empty');
    } else {
      console.log('-- Command history:', this.history.map(c => c.constructor.name).join(', '));
    }
  }
}

export default CommandManager;
