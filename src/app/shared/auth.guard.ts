import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('AuthGuard проверяет авторизацию');
    const isAuthenticated = this.auth.isAuthenticated();
    console.log('Пользователь авторизован:', isAuthenticated);

    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/admin', 'login'], {
        queryParams: {
          returnUrl: state.url // Сохраняем URL для редиректа после логина
        }
      });
      return false;
    }
  }
}
