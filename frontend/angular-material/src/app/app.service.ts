import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  url = 'http://localhost:3000/';
  users$ = new Subject();
  user$ = new Subject();
  constructor(
    private _http: HttpClient
  ) { }

  list(filter?: any): Observable<any> {
    const params = new HttpParams()
    .set('order', filter && filter.order || '')
    .set('search', filter && filter.search || '');
    return this._http.get(this.url, {params});
  }

  add(values: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this._http.post(this.url + 'add', values, {headers});
  }

  edit(id: string, values: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this._http.put(this.url + 'update/' + id, values, {headers});
  }

  delete(id: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'delete/' + id, {headers});
  }
}
