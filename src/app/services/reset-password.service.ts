import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPasswordModel } from '../models/reset-password-model';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private baseUrl: string = "https://localhost:7293/api/User/";
  
  constructor(private http: HttpClient) { }
  
  sendResetPasswordLink(email: string) {
  return  this.http.post<any>(`${this.baseUrl}send-reset-email/{email}`, {});

  }

  ResetPassword(ResetPasswordObj: ResetPasswordModel) {
  return  this.http.post<any>(`${this.baseUrl}reset-password`, ResetPasswordObj);
   }

}
