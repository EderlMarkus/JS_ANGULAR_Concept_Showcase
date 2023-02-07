import { Item } from 'src/app/models/Item';
import { createReducer, on } from '@ngrx/store';
import {
  addItem,
  loadItem,
  deleteItem,
  updateItem,
} from '../actions/item.actions';

export const intialState: Item[] = [];

export const itemReducer = createReducer(
  intialState,
  on(addItem, (state, item) => [...state, item]),
  on(loadItem, (state) => state),
  on(deleteItem, (state, item) => state.filter((i) => i.id != item.id)),
  on(updateItem, (state, item) =>
    state.map((i) => (i.id == item.id ? item : i))
  )
);
