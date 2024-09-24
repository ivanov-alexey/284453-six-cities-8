import { Command, CommandType } from './command.interface.js';
import { Logger, MessageLogger } from '../../shared/logger/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { TSVFileParser } from '../../shared/libs/file-parser/index.js';
import { Hotel } from '../../shared/types/index.js';

export class ImportCommand implements Command {
  private readonly name: CommandType = CommandType.import;
  private readonly logger: Logger;

  constructor() {
    this.logger = new MessageLogger();
  }

  private onImport(hotel: Hotel): void {
    this.logger.info(hotel.toString());
  }

  private onCompleteImport(count: number) {
    this.logger.info(`Total ${count} rows imported.`);
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
      this.logger.warn(`Invalid file path: ${filePath}`);

      return;
    }

    if (params.length > 1) {
      this.logger.warn(`Too many arguments for command`);

      return;
    }

    try {
      await this.readFile(filePath);
    } catch (e: unknown) {
      this.logger.warn(`Failed to load file with path: ${filePath}`);

      if (e instanceof Error) {
        this.logger.error(e.message, e);
      }
    }
  }
}
