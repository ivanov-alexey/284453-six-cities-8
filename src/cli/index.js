#!/usr/bin/env node

import { Command } from 'commander';
import { getPackageInfo, importFile } from './helpers.js';
import chalk from 'chalk';

const program = new Command();

const showHelp = async () => {
	const packageInfo = await getPackageInfo();

	program
		.description('Программа для подготовки данных для REST API сервера')
		.name('cli.js')
		.option('--import <path>', 'Импортирует данные из TSV')
		.option('--generate <n> <filepath> <url>', 'Создаёт файл в формате tsv с тестовыми данными')
		.version(packageInfo.version, '-v, --version', 'Версия программы')
		.helpOption('-h, --help ', 'Показать эту справку')
		.configureOutput({
			writeOut: (str) => process.stdout.write(chalk.green(str)),
			outputError: (str, write) => write(chalk.red(str)),
		})

		.action(() => {
			const options = program.opts();

			if (options.generate) {
				console.log(chalk.yellow('test'));

				return;
			}

			if (options.import) {
				const path = options.import;

				importFile(path).then((result) => console.log(result));

				return;
			}

			program.help();
		})
		.parse(process.argv);
};

const cliInit = () => {
	showHelp();
};

cliInit();
