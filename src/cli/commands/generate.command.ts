import got from 'got';
import { Command, CommandType } from './command.interface.js';
import { ConsoleLogger } from '../../shared/logger/index.js';
import { MockServerData } from '../../shared/types/mock-sever-data.interface.js';
import { TSVDataGenerator } from '../../shared/libs/data-generator/index.js';
import { appendFile } from 'node:fs/promises';

export class GenerateCommand implements Command {
  private readonly name: CommandType = CommandType.generate;
  private initialData: MockServerData = {} as MockServerData;

  private async loadData(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch (e) {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async writeData(filePath: string, offerCount: number) {
    const tswDataGenerator = new TSVDataGenerator(this.initialData);

    for (let i = 0; i < offerCount; i += 1) {
      await appendFile(filePath, `${tswDataGenerator.generate()}\n`, {
        encoding: 'utf-8',
      });
    }
  }

  public getName(): CommandType {
    return this.name;
  }

  public async run(...params: string[]): Promise<void> {
    const [count, filepath, url] = params;
    const offerCount = Number.parseInt(count, 10);

    try {
      ConsoleLogger.info(`Generate ${offerCount} offers from ${url} to ${filepath} file`);
      ConsoleLogger.info(`Loading...`);

      await this.loadData(url);
      await this.writeData(filepath, offerCount);

      ConsoleLogger.success(`File ${filepath} was created!`);
    } catch (e: unknown) {
      ConsoleLogger.error(`Failed to generate file with params: ${params}`);

      if (e instanceof Error) {
        ConsoleLogger.error(e.message);
      }
    }
  }
}
