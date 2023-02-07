import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from 'src/app/models/Item';
import { AppState } from 'src/app/store/models/state.model';
import { addItem } from 'src/app/store/actions/item.actions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  item: Item;

  constructor(private store: Store<AppState>, private router: Router) {
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

  onSubmit() {
    this.store.dispatch(addItem(this.item));
    alert(`${this.item.firstName} ${this.item.lastName} added!`);
    this.router.navigate(['/']);
  }
}
