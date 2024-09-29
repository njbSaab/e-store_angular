import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // List of public routes that don't require a token
  const publicUrls = ['/home'];

  // Check if the request URL is in the publicUrls list
  if (!publicUrls.some(url => req.url.includes(url))) {
    const authToken = auth.token;

    if (authToken) {
      req = req.clone({
        setParams: {
          auth: authToken
        }
      });
    }
  }

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        auth.logOut();
        router.navigate(['/admin', 'login']);
      }
      return throwError(() => err);
    })
  );
};
