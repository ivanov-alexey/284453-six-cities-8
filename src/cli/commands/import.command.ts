import { Command, CommandType } from './command.interface.js';
import { ConsoleLogger } from '../../shared/logger/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { TSVFileParser } from '../../shared/libs/file-parser/index.js';
import { Hotel } from '../../shared/types/index.js';

export class ImportCommand implements Command {
  private readonly name: CommandType = CommandType.import;

  private onImport(hotel: Hotel): void {
    ConsoleLogger.info(hotel.toString());
  }

  private onCompleteImport(count: number) {
    ConsoleLogger.info(`Total ${count} rows imported.`);
  }

  private async readFile(filePath: string): Promise<void> {
    const fileReader = new TSVFileReader(filePath, new TSVFileParser());

    fileReader.on('line', this.onImport);
    fileReader.on('end', this.onCompleteImport);

    await fileReader.read();
  }

  public getName(): CommandType {
    return this.name;
  }

  public async run(...params: string[]): Promise<void> {
    const [filePath] = params;

    if (!filePath) {
      ConsoleLogger.error(`Invalid file path: ${filePath}`);

      return;
    }

    if (params.length > 1) {
      ConsoleLogger.error(`Too many arguments for command`);

      return;
    }

    try {
      await this.readFile(filePath);
    } catch (e: unknown) {
      ConsoleLogger.error(`Failed to load file with path: ${filePath}`);

      if (e instanceof Error) {
        ConsoleLogger.error(e.message);
      }
    }
  }
}
