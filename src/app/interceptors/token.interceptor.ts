import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';




@Injectable()

export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService,private toast:ToastrService,private router:Router) {

    
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
    return next.handle(req).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
           // this.toast.error('Token is expired,login again', 'Error');
            //this.router.navigate(['/login']);

            //handle

          }
        }
        return throwError(()=>new Error("some other error occured"))
      })
    );
  }

  handleUnauthorizdError() {
   
    let tokenapiModel = new TokenApiModel();
    tokenapiModel.accessToken = this.auth.getToken()!;
    tokenapiModel.refreshToken = this.auth.getRefreshToken()!;

    return this.auth.renewToken(tokenapiModel)
      .pipe(
        switchMap((data: TokenApiModel) => {
          
        })
      )


    

  }
}