import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from '../models/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { SuccessComponent } from '../success/success.component';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3000/api/';
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  public emailName: string;
 

  constructor(private _http: HttpClient, private _router: Router, private dialog: MatDialog) { }

  getAuthStatusListener() {
    //console.log(this.authStatusListener.asObservable(), 'getAuthStatusListener');
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  createUser(email: string, password: string) {
    let newUserData;
    const authData: AuthData = { email: email, password: password };
    this._http.post(this.url + 'user/signup', authData)
      .subscribe(response => {
        newUserData = response
        console.log(newUserData.message)
        this.dialog.open(SuccessComponent, { data: { message: 'You have been registered! Now you can login!' } })
        this._router.navigate(['/']);
        //console.log(successMessage.message);
      }, error => {
        this.authStatusListener.next(false);
        console.log(error);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this._http.post<{token: string, userEmail: string, expiresIn: number}>(this.url + 'user/login', authData)
      .subscribe(response => {
        console.log(response)
        const token = response.token;
        this.token = token;
        if(token) {
          this.emailName = response.userEmail;
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.emailName);
          console.log(response)
          if(response.userEmail == 'test@gmail.com' && response.token == token) {
            console.log('this is admin user');
            this._router.navigate(['/admin']);
          } else {
            console.log('this is not admin user');
            this._router.navigate(['/']);
          }
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this._router.navigate(['/']);
  }

  saveAuthData(token: string, expirationDate: Date, email: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userEmail', email);
  }

  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userEmail');
  }

  getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userEmail = localStorage.getItem('userEmail');
    if(!token || !expirationDate || !userEmail) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() =>{
      this.logout();
    }, duration * 1000);
  }



}
