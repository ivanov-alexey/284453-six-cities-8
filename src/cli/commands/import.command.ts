import path from 'node:path';
import { readFileSync } from 'node:fs';
import { Command, CommandType } from './command.interface.js';
import { ConsoleLogger } from '../../shared/index.js';

export class ImportCommand implements Command {
	private readonly name: CommandType = CommandType.import;

	private importFile(filePath: string): string {
		const fullPath = path.join(process.cwd(), filePath);

		return readFileSync(fullPath, { encoding: 'utf8' });
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
			const content = this.importFile(filePath);

			ConsoleLogger.info(content);
		} catch (e: unknown) {
			ConsoleLogger.error(`Failed to load file with path: ${filePath}`);

			if (e instanceof Error) {
				ConsoleLogger.error(e.message);
			}
		}
	}
}
