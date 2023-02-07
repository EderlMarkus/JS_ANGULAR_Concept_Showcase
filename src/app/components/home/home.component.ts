import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from 'src/app/models/Item';
import { ItemService } from 'src/app/services/item.service';
import { deleteItem } from 'src/app/store/actions/item.actions';
import { AppState } from 'src/app/store/models/state.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  items: Item[] = [];
  constructor(
    private itemService: ItemService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('items').subscribe((items) => (this.items = items));
  }

  deleteItem(item: Item) {
    this.store.dispatch(deleteItem(item));
  }
}
