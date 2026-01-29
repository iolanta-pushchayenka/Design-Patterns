import DocumentPrototype from './documents/DocumentPrototype.js';
import WatermarkDecorator from './decorators/WatermarkDecorator.js';
import PasswordDecorator from './decorators/PasswordDecorator.js';
import SaveCommand from './commands/SaveCommand.js';
import PrintCommand from './commands/PrintCommand.js';
import UndoCommand from './commands/UndoCommand.js';
import CommandManager from './invoker/CommandManager.js';

// 1️⃣ Prototype
const originalDoc = new DocumentPrototype(
  'Lab Report',
  'This is the content of the lab report.'
);
console.log('Original document:', originalDoc.getInfo());

const clonedDoc = originalDoc.clone();
console.log('Cloned document:', clonedDoc.getInfo());

// 2️⃣ Decorator
let decoratedDoc = new WatermarkDecorator(clonedDoc);
decoratedDoc = new PasswordDecorator(decoratedDoc, 'pass123');
console.log('Decorated document:', decoratedDoc.getInfo());

// 3️⃣ Command
const commandManager = new CommandManager();

const saveCommand = new SaveCommand(decoratedDoc);
const printCommand1 = new PrintCommand(decoratedDoc);
const printCommand2 = new PrintCommand(decoratedDoc);
const undoCommand = new UndoCommand(commandManager);

// 4️⃣ Выполняем команды
console.log('\n--- Executing Commands ---');
commandManager.executeCommand(saveCommand);
commandManager.executeCommand(printCommand1);
commandManager.executeCommand(printCommand2);

// 5️⃣ Undo последней команды
console.log('\n--- Undo Last Command ---');
undoCommand.execute();

// 6️⃣ Состояние документа после всех операций
console.log('\nFinal document info:');
console.log(decoratedDoc.getInfo());


