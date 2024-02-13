import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private hasError$ = new BehaviorSubject<boolean>(false);

  get() {
    return this.hasError$;
  }

  update(newValue: boolean) {
    this.hasError$.next(newValue);
  }
}
