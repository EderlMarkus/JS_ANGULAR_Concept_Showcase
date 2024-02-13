import { Constructor } from './constructor';

export function canAlert<T extends Constructor>(base: T) {
  return class extends base {
    showAlertBox(message: string) {
      alert(`Die Alert Box sagt: ${message}`);
    }
  };
}
