import { createSelector } from '@ngrx/store';
import { Item } from 'src/app/models/Item';
import { AppState } from '../models/state.model';

export const selectItems = (state: AppState) => state.items;

export const selectItemCollection = createSelector(
  selectItems,
  (state: Item[]) => state
);
