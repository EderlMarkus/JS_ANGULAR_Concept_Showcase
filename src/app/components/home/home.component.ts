import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeFacade } from 'src/app/facades/homeFacade';
import { canAlert } from 'src/app/mixins/alert';
import { canConsoleLogMessage } from 'src/app/mixins/consolelog';
import { Notifier } from 'src/app/shared/notifier';

const homeComponentMixin = canConsoleLogMessage(canAlert(class Parent {
  constructor() { }
}))

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends homeComponentMixin {
  private homeFacade: HomeFacade = inject(HomeFacade);
  protected posts$: Observable<any> = this.homeFacade.getPostWithCommentsById(1)
  private message = "Du hast mich in der Home-Komponente geklickt."

  protected alertUser() {
    this.showAlertBox(this.message);
  }
  protected logMessage() {
    this.consoleLogMessage(this.message);
  }
}
