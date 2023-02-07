import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Item } from 'src/app/models/Item';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = 'https://hub.dummyapis.com/employee';
  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  deleteItem(Item: Item): Observable<Item> {
    const url = `${this.apiUrl}/${Item.id}`;
    return this.http.delete<Item>(url);
  }

  updateItem(Item: Item): Observable<Item> {
    const url = `${this.apiUrl}/${Item.id}`;
    return this.http.put<Item>(url, Item, httpOptions);
  }

  addItem(Item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, Item, httpOptions);
  }
}
