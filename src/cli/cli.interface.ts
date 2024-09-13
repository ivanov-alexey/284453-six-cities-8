import { Command } from './commands/command.interface.js';

export interface Cli {
  registerCommands(commands: Command[]): void;

  processInput(argv: string[]): void;
}
