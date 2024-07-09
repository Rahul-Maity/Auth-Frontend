import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthService);
  const myToken = auth.getToken();
  if (myToken)
  {
  const clonedreq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${myToken}`
      }
  });
    return next(clonedreq);
  }
  
  return next(req);
  // return next.ha(req);
};
