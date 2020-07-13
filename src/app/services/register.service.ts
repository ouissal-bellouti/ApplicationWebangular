import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../pages/user';
import { Observable } from 'rxjs';
import { Utilisateur } from '../pages/utilisateur';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:5000/Account/';
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true,
  };


  UserLogin(log: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'Login', log, this.headers).pipe();
  }

  GetAllUsers(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.baseUrl + 'GetAllUsers').pipe();
  }

  LogoutUsers() {
    return this.http.get(this.baseUrl + 'Logout').pipe();
}

}
