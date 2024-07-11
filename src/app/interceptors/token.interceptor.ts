import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';




@Injectable()

export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {

    
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const myToken = localStorage.getItem('authToken');

    if (myToken)
    {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${myToken}`)
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}