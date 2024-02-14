import { Injectable, inject } from '@angular/core';
import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service';
import {
  catchError,
  mergeMap,
  BehaviorSubject,
  of,
  Observable,
  map,
  combineLatest,
  distinctUntilChanged,
  tap,
  take,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface FacadeState {
  data: any[];
  loading: boolean;
  error: HttpErrorResponse | null;
}

let _state: FacadeState = {
  data: [],
  loading: false,
  error: null,
};

@Injectable({
  providedIn: 'root',
})
export class HomeFacade {
  private store = new BehaviorSubject<FacadeState>(_state);
  private state$ = this.store.asObservable();
  private loading$ = this.state$.pipe(map((state) => state.loading));
  private error$ = this.state$.pipe(map((state) => state.error));
  private data$ = this.state$.pipe(
    map((state) => state.data),
    distinctUntilChanged()
  );
  private postService: PostService = inject(PostService);
  private commentService: CommentService = inject(CommentService);

  public vm$: Observable<FacadeState> = combineLatest([
    this.data$,
    this.loading$,
    this.error$,
  ]).pipe(
    map(([data, loading, error]) => {
      return { data, loading, error };
    })
  );

  getPostWithCommentsById(postId: number) {
    this.updateState({ data: [], loading: true, error: null });
    this.postService
      .getById(postId)
      .pipe(
        take(1),
        tap(() => this.updateState({ ..._state, loading: true })),
        catchError((error) => {
          this.updateState({ ..._state, error });
          return of({ id: 1 });
        }),
        mergeMap((post) => this.commentService.getByPostId(post.id)),
        map((posts) =>
          this.updateState({ ..._state, data: posts, loading: false })
        )
      )
      .subscribe();
  }

  toggleLoading() {
    this.updateState({ ..._state, loading: !_state.loading });
  }

  private updateState(state: FacadeState) {
    this.store.next((_state = state));
  }
}
