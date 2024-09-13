type ParsedCommand = Record<string, string[]>;

export class CommandParser {
	public static parseFromArgv(argv: string[]): ParsedCommand {
		const result: ParsedCommand = {};
		let currentCommand = '';

		for (const argument of argv) {
			if (argument.startsWith('--')) {
				result[argument] = [];
				currentCommand = argument;
			} else if (currentCommand && argument) {
				result[currentCommand].push(argument);
			}
		}

		return result;
	}
}
