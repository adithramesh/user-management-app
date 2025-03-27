import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthState, User } from './app.state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http=inject(HttpClient)
  constructor() { }

  localApi='http://localhost:3000/'
  register(user:User):Observable<AuthState>{
    console.log("called service");
    
    return this.http.post<AuthState>(`${this.localApi}register`,user)
  }

  login(user:User):Observable<AuthState>{
    return this.http.post<AuthState>(`${this.localApi}login`,user)
  }
}
