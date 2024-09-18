import { Command, CommandType } from './command.interface.js';
import { ConsoleLogger } from '../../shared/logger/index.js';

export class HelpCommand implements Command {
  private readonly name: CommandType = CommandType.help;

  public getName(): CommandType {
    return this.name;
  }

  public async run(..._params: string[]): Promise<void> {
    ConsoleLogger.log(`
    Программа для подготовки данных для REST API сервера.

    Пример: cli.js --<command> [--arguments]

    Команды:
     --version:                   # выводит номер версии
     --help:                      # печатает этот текст
     --import <path>:             # импортирует данные из TSV
     --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
		`);
  }
}
