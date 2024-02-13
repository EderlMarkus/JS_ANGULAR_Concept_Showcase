import { Component, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { ErrorService } from 'src/app/facades/errorService';
import { FacadeState, HomeFacade } from 'src/app/facades/homeFacade';
import { canAlert } from 'src/app/mixins/alert';
import { canConsoleLogMessage } from 'src/app/mixins/consolelog';

const homeComponentMixin = canConsoleLogMessage(canAlert(class Home {}));

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends homeComponentMixin {
  protected homeFacade: HomeFacade = inject(HomeFacade);
  vm$: Observable<FacadeState> = this.homeFacade.vm$;

  protected loading$: Observable<boolean> = of(false);

  private message = 'Du hast mich in der Home-Komponente geklickt.';

  protected alertUser() {
    this.showAlertBox(this.message);
  }
  protected logMessage() {
    this.consoleLogMessage(this.message);
  }
  protected loadPosts() {
    this.homeFacade.getPostWithCommentsById(1);
  }
}
