import { Component, inject } from '@angular/core';
import { Item } from 'src/app/models/Item';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { canAlert } from 'src/app/mixins/alert';
import { canConsoleLogMessage } from 'src/app/mixins/consolelog';

const addComponentMixin = canConsoleLogMessage(canAlert(class Add {}));

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent extends addComponentMixin {
  private router: Router = inject(Router);
  private itemService: ItemService = inject(ItemService);
  private message = 'Du hast mich in der Add-Komponente geklickt.';

  protected item: Item = {
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

  protected alertUser() {
    this.showAlertBox(this.message);
  }
  protected logMessage() {
    this.consoleLogMessage(this.message);
  }

  protected onSubmit() {
    this.itemService.addItem(this.item);
    alert(`${this.item.firstName} ${this.item.lastName} added!`);
    this.router.navigate(['/']);
  }
}
