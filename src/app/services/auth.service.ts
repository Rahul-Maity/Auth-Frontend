import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "https://localhost:7293/api/User/";
  constructor(private http: HttpClient,private router:Router) { }
  
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
}
