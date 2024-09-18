import chalk from 'chalk';

export class ConsoleLogger {
  public static info(message: string): void {
    console.log(chalk.blue(message));
  }

  public static log(message: string): void {
    console.log(chalk.white(message));
  }

  public static warning(message: string): void {
    console.log(chalk.yellow(message));
  }

  public static error(message: string): void {
    console.log(chalk.red(message));
  }

  public static success(message: string): void {
    console.log(chalk.green(message));
  }
}
