import { Injectable, inject } from '@angular/core';
import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service';
import { catchError, of, mergeMap } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class HomeFacade {
    private postService: PostService = inject(PostService);
    private commentService: CommentService = inject(CommentService);

    getPostWithCommentsById(postId: number) {
        return this.postService.getById(postId).pipe(
            catchError(e => {
                //Spezielles Verhalten wenn der PostService failed
                alert('Ein Fehler beim Abruf vom Postservice')
                //Value mit dem weitergearbeitet werden soll
                return of({id: 0})
            }),
            mergeMap(post => this.commentService.getByPostId(post.id)),
            catchError(e => {
                //Spezielles Verhalten wenn der CommentService failed
                alert('Ein Fehler beim Abruf vom CommentService')
                //Value mit dem weitergearbeitet werden soll
                return of({
                    id: 0,
                    postId: 0,
                    name: "Default",
                    email: "default@error.com",
                    body: "Dieser Aufruf war fehlerhaft"
                  }
                  )
            })
        )
    }
}
