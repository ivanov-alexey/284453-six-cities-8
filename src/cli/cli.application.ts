import { Cli } from './cli.interface.js';
import { Command, CommandType } from './commands/command.interface.js';
import { CommandParser } from './command.parser.js';

const DEFAULT_COMMAND = CommandType.help;

type TCommands = Record<CommandType, Command>;

export class CliApplication implements Cli {
	private commands: TCommands = {} as TCommands;

	private getCommandType(name: string): CommandType {
		return Object.values(CommandType).find((value) => value === name) ?? DEFAULT_COMMAND;
	}

	public registerCommands(commands: Command[]): void {
		commands.forEach((command) => {
			this.commands[command.getName()] = command;
		});
	}

	public processInput(argv: string[]): void {
		const parsedCommand = CommandParser.parseFromArgv(argv);
		const [commandName] = Object.keys(parsedCommand);
		const commandType = this.getCommandType(commandName);
		const commandArguments = parsedCommand[commandName] ?? [];
		const command = this.commands[commandType];

		command.run(...commandArguments);
	}
}
