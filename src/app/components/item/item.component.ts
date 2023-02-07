import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  @Output() onDeleteItem: EventEmitter<Item> = new EventEmitter();
  constructor() {
    this.item = {
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      age: 0,
      dob: '',
      salary: 0,
      address: '',
      id: 0,
      imageUrl:
        'https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg',
    };
  }

  ngOnInit(): void {}

  onDelete(item: Item) {
    this.onDeleteItem.emit(item);
  }
}
