import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'https://localhost:7293/api/User';
  constructor(private http: HttpClient) { }
  
  getUsers()
  {
    return this.http.get( this.baseUrl );

  }
  
}
