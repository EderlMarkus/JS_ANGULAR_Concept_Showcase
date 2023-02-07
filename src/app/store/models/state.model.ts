import { Item } from 'src/app/models/Item';

export interface AppState {
  readonly items: Item[];
}
