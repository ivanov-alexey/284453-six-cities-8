export enum CommandType {
	'help' = '--help',
	'version' = '--version',
	'generate' = '--generate',
	'import' = '--import',
}

export interface Command {
	run(...params: string[]): Promise<void>;

	getName(): CommandType;
}
