import { environment } from './../../../../environment/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';  // Убедитесь, что используете правильный импорт

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(User: { email: string; password: string; }) {
    return this.http.post<AuthResponse>(  // Указываем тип ответа от сервера
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
      { ...User, returnSecureToken: true } // Обязательно включаем returnSecureToken
    ).pipe(
      tap(response => this.setToken(response))  // Передаем объект в setToken
    );
  }

  private setToken(response: AuthResponse | null) {
    if (response) {
      const expData = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token-exp', expData.toString());
      localStorage.setItem('fb-token', response.idToken);
    } else {
      localStorage.clear();
    }
  }

  get token(): string | null {
    const expDateStr = localStorage.getItem('fb-token-exp');
    if (!expDateStr) {
      this.logOut();
      return null;
    }

    const exDate = new Date(expDateStr);
    if (exDate <= new Date()) {
      this.logOut();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  logOut() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}

// Описание интерфейса ответа от сервера
interface AuthResponse {
  idToken: string;
  expiresIn: string;  // Время жизни токена в секундах
}
