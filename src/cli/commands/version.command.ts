import path from 'node:path';
import { readFileSync } from 'node:fs';
import { Command, CommandType } from './command.interface.js';
import { Logger, MessageLogger } from '../../shared/logger/index.js';

export class VersionCommand implements Command {
  private readonly name: CommandType = CommandType.version;
  private readonly logger: Logger;

  constructor() {
    this.logger = new MessageLogger();
  }

  private getVersion(): string {
    if (!process.env.PWD) throw new Error('process.env.PWD is wrong');

    const packagePath = path.join(process.env.PWD, 'package.json');
    const info = JSON.parse(readFileSync(packagePath, { encoding: 'utf8' }));

    if (!info.version) throw new Error('Invalid package.json version');

    return info.version;
  }

  public getName(): CommandType {
    return this.name;
  }

  public async run(..._params: string[]): Promise<void> {
    try {
      this.logger.info(this.getVersion());
    } catch (e: unknown) {
      this.logger.warn('Failed to read version from package.json');

      if (e instanceof Error) {
        this.logger.error(e.message, e);
      }
    }
  }
}
