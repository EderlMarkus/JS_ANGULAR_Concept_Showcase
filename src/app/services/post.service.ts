import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) {}

  getById(id: number): Observable<Post>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Post>(url);
  }

  get(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  delete(Post: Post): Observable<Post> {
    const url = `${this.apiUrl}/${Post.id}`;
    return this.http.delete<Post>(url);
  }

  update(Post: Post): Observable<Post> {
    const url = `${this.apiUrl}/${Post.id}`;
    return this.http.put<Post>(url, Post, httpOptions);
  }

  add(Post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, Post, httpOptions);
  }
}
