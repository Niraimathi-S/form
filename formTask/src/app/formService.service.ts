import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from './model';

@Injectable()
export class FormService {
  users: any;
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<user[]> {
    return this.http.get<user[]>('http://localhost:8080/getAllUsers');
  }

  addUser(user: user) {
    return this.http
      .post<user>('http://localhost:8080/create', user)
      .subscribe();
  }
}
