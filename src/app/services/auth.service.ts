import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  static BASE_URL: string = `${environment.apiUrl}/auth`;
  public user: any = {}

  constructor(private http: Http) {
  }

  logout(): any {
    localStorage.removeItem('username');
  }

  isLoggedIn(): Promise<any> {
    return this.http.get(`${AuthService.BASE_URL}/check-logged`).map(res => res.json()).toPromise().then((data) => this.user = data);
  }
}

@Injectable()
export class TokenService {

  constructor() {
  }

  logout(): any {
    localStorage.removeItem('token');
    window.location.href = `${environment.apiUrl}/auth?token=true&callbackUrl=${`${window.location.protocol}//${window.location.host}`}`;
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
}
