import chalk from 'chalk';
import { Logger } from './logger.interface.js';

export class MessageLogger implements Logger {
  public info(message: string): void {
    console.log(chalk.blue(message));
  }

  public warn(message: string): void {
    console.log(chalk.yellow(message));
  }

  public error(message: string): void {
    console.log(chalk.red(message));
  }

  public debug(message: string) {
    console.log(chalk.red(message));
  }
}
