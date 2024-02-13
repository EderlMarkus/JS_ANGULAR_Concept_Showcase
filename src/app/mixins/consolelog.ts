import { Constructor } from './constructor';

export function canConsoleLogMessage<T extends Constructor>(base: T) {
  return class extends base {
    consoleLogMessage(message: string) {
      console.log(`%cDie Console sagt: ${message}`, 'color: red');
    }
  };
}
