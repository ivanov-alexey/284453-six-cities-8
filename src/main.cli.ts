#!/usr/bin/env node

import {
  CliApplication,
  VersionCommand,
  HelpCommand,
  ImportCommand,
  GenerateCommand,
} from './cli/index.js';

const bootstrap = () => {
  const cli = new CliApplication();

  cli.registerCommands([
    new VersionCommand(),
    new HelpCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);
  cli.processInput(process.argv);
};

bootstrap();
