import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { environment } from 'src/environments/environment';
import { User } from 'src/app/pages/user';
import { CryptService } from './crypt.service';

@Injectable({ providedIn: 'root' })
export class AuthentificationService {


  email: string;
  expire: string;
  role: string;

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private service: CryptService) {
      if (this.isUserRegistered()) {
        this.expire = this.service.Decrypt(localStorage.getItem('expire'));
        this.email = this.service.Decrypt(localStorage.getItem('email'));
        this.role = this.service.Decrypt(localStorage.getItem('role'));
      }
    }


    installStorage(rem: boolean, email: string) {
      const day = new Date();
      if (rem) {
        day.setDate(day.getDate() + 10);
      } else {
        day.setMinutes(day.getMinutes() + 30);
      }

      localStorage.setItem('email', this.service.Encrypt(email));
      localStorage.setItem('expire', this.service.Encrypt(day.toString()));

      this.GetRoleName(email).subscribe(success => {
        localStorage.setItem('role', this.service.Encrypt(success));
      }, e => console.log(e));
    }

    IsExpiredDate(day: string) {
      const dateNow = new Date();
      const dateExpire = new Date(Date.parse(day));
      if (dateExpire < dateNow) {
        return true;
      }
      return false;
    }

    isUserRegistered() {
      const email = !!localStorage.getItem('email');
      const exp = !!localStorage.getItem('expire');
      const role = !!localStorage.getItem('role');

      if (email && role && exp) {
        return true;
      }
      return false;
    }

    GetRoleName(email: string) {
      return this.http.get('http://localhost:5000/Account/GetRoleName/' + email, { responseType: 'text' }).pipe();
    }

    ValidateUser(email: string, role: string): Observable<any> {
      return this.http.get('http://localhost:5000/Account/CheckUserClaims/' + email + '&' + role,
        { withCredentials: true }).pipe();
    }

}
