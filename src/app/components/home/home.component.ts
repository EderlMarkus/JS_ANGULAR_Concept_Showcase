import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeFacade } from 'src/app/facades/homeFacade';
import { Item } from 'src/app/models/Item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private homeFacade: HomeFacade = inject(HomeFacade);
  protected posts$: Observable<any> = this.homeFacade.getPostWithCommentsById(1)
}
