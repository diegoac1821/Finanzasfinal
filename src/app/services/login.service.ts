import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwRequest';
import { tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'https://finanzas-hkv2.onrender.com';
  private helper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(request: JwtRequest) {
    return this.http.post<any>(`${this.baseUrl}/login`, request).pipe(
      tap((response) => {
        if (response.token) {
          sessionStorage.setItem('token', response.token);
          console.log('✅ Token almacenado en sessionStorage:', response.token);
        } else {
          console.warn('⚠️ El backend no devolvió un token válido.');
        }
      })
    );
  }
  register(data: { username: string; password: string; rol: string }) {
    return this.http.post(`${this.baseUrl}/api/auth/register`, data);
  }
  verificar(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.warn('❌ No hay token en sesión.');
      return false;
    }

    if (this.helper.isTokenExpired(token)) {
      console.warn('⏳ Token expirado.');
      return false;
    }

    return true;
  }

  showRole() {
    const token = sessionStorage.getItem('token');
    if (!token) return null;

    const decoded = this.helper.decodeToken(token);
    return {
      role: decoded?.rol,
      name: decoded?.nombre,
      id: decoded?.id,
    };
  }

  getUsuarioId(): number {
    const token = sessionStorage.getItem('token');
    if (!token) return 0;

    const decoded = this.helper.decodeToken(token);
    const id = decoded?.id;
    return !id || isNaN(id) ? 0 : Number(id);
  }

  getUserRole(): string | null {
    const info = this.showRole();
    return info ? info.role : null;
  }
}
