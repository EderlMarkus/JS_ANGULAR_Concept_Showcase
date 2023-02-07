import { createAction, props } from '@ngrx/store';
import { Item } from 'src/app/models/Item';

export const addItem = createAction('Add Item', props<Item>());
export const removeItem = createAction('Remove Item', props<Item>());
export const loadItem = createAction('Load Item');
export const deleteItem = createAction('Delete Item', props<Item>());
export const updateItem = createAction('Update Item', props<Item>());
