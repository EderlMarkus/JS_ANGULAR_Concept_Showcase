import { Injectable, inject } from '@angular/core';
import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service';
import {
  catchError,
  mergeMap,
  BehaviorSubject,
  of,
  Observable,
  EMPTY,
  map,
  combineLatest,
  distinctUntilChanged,
  tap,
  take,
} from 'rxjs';

export interface FacadeState {
  data: any[];
  loading: boolean;
}

let _state: FacadeState = {
  data: [],
  loading: true,
};

@Injectable({
  providedIn: 'root',
})
export class HomeFacade {
  private store = new BehaviorSubject<FacadeState>(_state);
  private state$ = this.store.asObservable();
  private loading$ = this.state$.pipe(map((state) => state.loading));
  private data$ = this.state$.pipe(
    map((state) => state.data),
    distinctUntilChanged()
  );
  private postService: PostService = inject(PostService);
  private commentService: CommentService = inject(CommentService);

  public vm$: Observable<FacadeState> = combineLatest([
    this.data$,
    this.loading$,
  ]).pipe(
    map(([data, loading]) => {
      return { data, loading };
    })
  );

  //   constructor() {
  //     this.data$.subscribe((data) =>
  //       this.updateState({ ..._state, data, loading: false })
  //     );
  //   }

  getPostWithCommentsById(postId: number) {
    this.updateState({ ..._state, data: [], loading: true });
    this.postService
      .getById(postId)
      .pipe(
        take(1),
        tap(() => this.updateState({ ..._state, loading: true })),
        mergeMap((post) => this.commentService.getByPostId(post.id)),
        map((posts) => this.updateState({ data: posts, loading: false }))
      )
      .subscribe();
  }

  toggleLoading() {
    this.updateState({ ..._state, loading: !_state.loading });
  }

  private updateState(state: FacadeState) {
    this.store.next(state);
  }
}
