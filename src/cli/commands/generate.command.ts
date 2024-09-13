import { Command, CommandType } from './command.interface.js';
import { ConsoleLogger } from '../../shared/index.js';

export class GenerateCommand implements Command {
  private readonly name: CommandType = CommandType.generate;

  public getName(): CommandType {
    return this.name;
  }

  public async run(...params: string[]): Promise<void> {
    try {
      ConsoleLogger.warning('Currently in development');
    } catch (e: unknown) {
      ConsoleLogger.error(`Failed to generate file with params: ${params}`);

      if (e instanceof Error) {
        ConsoleLogger.error(e.message);
      }
    }
  }
}
