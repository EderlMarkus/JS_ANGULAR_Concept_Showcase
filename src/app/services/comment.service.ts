import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Comment } from '../models/Comment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/comments';
  constructor(private http: HttpClient) {}

  getByPostId(postId: number): Observable<Comment[]> {
    return this.get().pipe(
      map(comments => comments.filter(comment => comment.postId === postId))
    )
  }

  get(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiUrl);
  }

  delete(comment: Comment): Observable<Comment> {
    const url = `${this.apiUrl}/${comment.id}`;
    return this.http.delete<Comment>(url);
  }

  update(comment: Comment): Observable<Comment> {
    const url = `${this.apiUrl}/${comment.id}`;
    return this.http.put<Comment>(url, Comment, httpOptions);
  }

  add(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, comment, httpOptions);
  }
}
