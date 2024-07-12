import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "https://localhost:7293/api/User/";
  private userPayload: any;
  constructor(private http: HttpClient, private router: Router) { 
    this.userPayload = this.decodedToken();
  }
  
  signup(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }

  login(loginObj: any):Observable<any> {
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj)
      .pipe(
        tap(res => {
          localStorage.setItem('authToken', res.token);
        })
      );
   
  }
  signOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
}
  storeToken(tokenValue: string):void
  {
    localStorage.setItem('authToken', tokenValue);

  }
  getToken():string|null
  {
    return  localStorage.getItem('authToken');

  }
  isLoggedIn(): boolean{
    return !!localStorage.getItem('authToken');
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const Token = this.getToken()!;
    console.log(jwtHelper.decodeToken(Token));
    return jwtHelper.decodeToken(Token);



  }

  getFullnameFromToken() {
    if (this.userPayload) {
      return this.userPayload.unique_name;
    }
  }

  getRoleFromToken() {
    if (this.userPayload) {
      return this.userPayload.role;
    }
  }
}
